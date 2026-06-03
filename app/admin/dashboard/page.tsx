

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import { 
  FiUsers, FiGlobe, FiGrid, FiCalendar, FiVolume2, 
  FiPlus, FiEdit2, FiTrash2, FiX, FiChevronDown,
  FiMapPin, FiUserPlus, FiUserMinus, FiMenu, FiChevronRight
} from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { GiCrown } from 'react-icons/gi';

// ============================================
// TYPES
// ============================================
interface Sector {
  _id: string; name: string; description?: string;
  communityId: { _id: string; name: string; type: string };
  presidentName: string; presidentPhone: string;
  status: string; membersCount: number; createdAt: string;
}
interface User {
  _id: string; name: string; email: string; phone: string;
  role: string; isRestricted: boolean; createdAt: string;
}
interface Community {
  _id: string; name: string; type: string;
  country: string; city?: string; createdAt: string;
}
interface Event {
  _id: string; title: string; description: string; date: string;
  location: string; sectorId: { _id: string; name: string };
  is_boosted: boolean; createdBy: { name: string };
  participants: string[]; createdAt: string;
}
interface Ad {
  _id: string; title: string; content: string; is_sponsored: boolean;
  sponsor_expires_at?: string; createdBy: { _id: string; name: string; email: string };
  sectorId?: { _id: string; name: string };
  communityId?: { _id: string; name: string }; createdAt: string;
}

// ============================================
// SOUS-COMPOSANTS UTILITAIRES
// ============================================

/** Badge de statut */
function StatusBadge({ active, labelOn = 'Actif', labelOff = 'Bloqué' }: { active: boolean; labelOn?: string; labelOff?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
      active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'}`} />
      {active ? labelOn : labelOff}
    </span>
  );
}

/** Section header réutilisable */
function SectionHeader({ icon: Icon, title, action }: { icon: any; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-[#C9A96E]/10">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center">
          <Icon size={15} className="text-[#C9A96E]" />
        </div>
        <h2 className="font-serif text-[17px] sm:text-xl font-bold text-[#1A1712]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

/** Ligne de liste mobile-friendly */
function ListRow({ left, right, highlight }: { left: React.ReactNode; right: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`p-3 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
      highlight ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 bg-white'
    }`}>
      <div className="flex-1 min-w-0">{left}</div>
      <div className="flex flex-wrap gap-2 flex-shrink-0">{right}</div>
    </div>
  );
}

/** Boutons d'action compacts */
function ActionBtn({ onClick, disabled, variant = 'secondary', icon: Icon, label }: {
  onClick: () => void; disabled?: boolean; variant?: 'secondary' | 'danger' | 'success';
  icon: any; label: string;
}) {
  const colors = {
    secondary: 'bg-[#EDE9DF] text-[#1A1712] hover:bg-[#E0DAD0]',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    success: 'bg-green-50 text-green-700 hover:bg-green-100',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 disabled:opacity-50 ${colors[variant]}`}
    >
      <Icon size={12} />
      <span>{label}</span>
    </button>
  );
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [stats, setStats] = useState({ totalUsers: 0, totalCommunities: 0, totalSectors: 0, totalEvents: 0, totalAds: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [newCommunity, setNewCommunity] = useState({ name: '', type: 'city', country: 'Cameroun', city: '' });
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [showCreateSector, setShowCreateSector] = useState(false);
  const [newSector, setNewSector] = useState({ name: '', description: '', communityId: '', presidentPhone: '', presidentName: '', sendInvitation: true });
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', sectorId: '', is_boosted: false });
  const [ads, setAds] = useState<Ad[]>([]);
  const [showCreateAd, setShowCreateAd] = useState(false);
  const [newAd, setNewAd] = useState({ title: '', content: '', sectorId: '', communityId: '' });

  // ── DATA LOADING ──
  useEffect(() => { loadInitialData(); }, []);
  useEffect(() => {
    if (activeTab === 'users') loadUsers();
    if (activeTab === 'communities') loadCommunities();
    if (activeTab === 'create-sector') loadCommunitiesForSelect();
    if (activeTab === 'all-sectors') loadSectors();
    if (activeTab === 'events') loadEvents();
    if (activeTab === 'ads') loadAds();
  }, [activeTab]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [userRes, statsRes] = await Promise.all([fetch('/api/auth/me'), fetch('/api/admin/stats')]);
      if (!userRes.ok) { router.push('/login'); return; }
      const userData = await userRes.json();
      if (userData.user.role !== 'super_admin') { router.push('/dashboard'); return; }
      setStats(await statsRes.json());
    } catch { toast.error('Erreur de chargement'); } finally { setLoading(false); }
  };

  const loadUsers = async () => {
    try { const r = await fetch('/api/admin/users'); setUsers(Array.isArray(await r.json()) ? await (await fetch('/api/admin/users')).json() : []); }
    catch { toast.error('Erreur chargement utilisateurs'); }
  };
  const loadCommunities = async () => {
    try { const r = await fetch('/api/communities'); const d = await r.json(); setCommunities(Array.isArray(d) ? d : []); }
    catch { toast.error('Erreur chargement communautés'); }
  };
  const loadCommunitiesForSelect = async () => {
    try { const r = await fetch('/api/communities'); const d = await r.json(); setCommunities(Array.isArray(d) ? d : []); }
    catch {}
  };
  const loadSectors = async () => {
    try { const r = await fetch('/api/sectors'); const d = await r.json(); setSectors(Array.isArray(d) ? d : []); }
    catch { toast.error('Erreur chargement secteurs'); }
  };
  const loadEvents = async () => {
    try { const r = await fetch('/api/events'); const d = await r.json(); setEvents(Array.isArray(d) ? d : []); }
    catch { toast.error('Erreur chargement événements'); }
  };
  const loadAds = async () => {
    try { const r = await fetch('/api/ads'); const d = await r.json(); setAds(Array.isArray(d) ? d : []); }
    catch { toast.error('Erreur chargement annonces'); }
  };

  // ── CRUD COMMUNITIES ──
  const createCommunity = async (e: React.FormEvent) => {
    e.preventDefault(); setActionLoading('community');
    try {
      const r = await fetch('/api/communities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCommunity) });
      const d = await r.json();
      if (r.ok) { toast.success('Communauté créée'); setShowCreateCommunity(false); setNewCommunity({ name: '', type: 'city', country: 'Cameroun', city: '' }); loadCommunities(); }
      else toast.error(d.error || 'Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const updateCommunity = async () => {
    if (!editingItem) return; setActionLoading('update-community');
    try {
      const r = await fetch(`/api/communities/${editingItem._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem) });
      if (r.ok) { toast.success('Mise à jour effectuée'); setShowEditModal(false); setEditingItem(null); loadCommunities(); }
      else toast.error('Erreur mise à jour');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const deleteCommunity = async (id: string) => {
    if (!confirm('Supprimer cette communauté ?')) return; setActionLoading(id);
    try {
      const r = await fetch(`/api/communities/${id}`, { method: 'DELETE' });
      if (r.ok) { toast.success('Supprimée'); loadCommunities(); } else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };

  // ── CRUD SECTORS ──
  const createSector = async (e: React.FormEvent) => {
    e.preventDefault(); setActionLoading('create-sector');
    try {
      const r = await fetch('/api/admin/sectors/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSector) });
      const d = await r.json();
      if (r.ok) {
        if (d.sector?.tempPassword) toast.success(`✅ Secteur créé — MDP: ${d.sector.tempPassword}`, { duration: 60000 });
        else toast.success('Secteur créé');
        setShowCreateSector(false);
        setNewSector({ name: '', description: '', communityId: '', presidentPhone: '', presidentName: '', sendInvitation: true });
        loadSectors();
      } else toast.error(d.error || 'Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const updateSector = async () => {
    if (!editingItem) return; setActionLoading('update-sector');
    try {
      const r = await fetch(`/api/admin/sectors/${editingItem._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: editingItem.name, description: editingItem.description, presidentPhone: editingItem.presidentPhone, presidentName: editingItem.presidentName }) });
      if (r.ok) { toast.success('Secteur mis à jour'); setShowEditModal(false); setEditingItem(null); loadSectors(); }
      else { const d = await r.json(); toast.error(d.error || 'Erreur'); }
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const deleteSector = async (id: string) => {
    if (!confirm('Supprimer ce secteur ?')) return; setActionLoading(id);
    try {
      const r = await fetch(`/api/admin/sectors/${id}`, { method: 'DELETE' });
      if (r.ok) { toast.success('Secteur supprimé'); loadSectors(); } else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };

  // ── CRUD USERS ──
  const updateUserRole = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    try {
      const r = await fetch('/api/admin/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, role: newRole }) });
      if (r.ok) { toast.success('Rôle mis à jour'); loadUsers(); } else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const deleteUser = async (userId: string) => {
    if (!confirm('Supprimer cet utilisateur ?')) return; setActionLoading(userId);
    try {
      const r = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      if (r.ok) { toast.success('Utilisateur supprimé'); loadUsers(); } else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };

  // ── CRUD EVENTS ──
  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault(); setActionLoading('event');
    try {
      const r = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEvent) });
      const d = await r.json();
      if (r.ok) { toast.success('Événement créé'); setShowCreateEvent(false); setNewEvent({ title: '', description: '', date: '', location: '', sectorId: '', is_boosted: false }); loadEvents(); }
      else toast.error(d.error || 'Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const updateEvent = async () => {
    if (!editingItem) return; setActionLoading('update-event');
    try {
      const r = await fetch(`/api/events/${editingItem._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem) });
      if (r.ok) { toast.success('Événement mis à jour'); setShowEditModal(false); setEditingItem(null); loadEvents(); }
      else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const deleteEvent = async (eventId: string) => {
    if (!confirm('Supprimer cet événement ?')) return; setActionLoading(eventId);
    try {
      const r = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
      if (r.ok) { toast.success('Événement supprimé'); loadEvents(); } else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };

  // ── CRUD ADS ──
  const createAd = async (e: React.FormEvent) => {
    e.preventDefault(); setActionLoading('ad');
    try {
      const r = await fetch('/api/ads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAd) });
      const d = await r.json();
      if (r.ok) { toast.success('Annonce créée'); setShowCreateAd(false); setNewAd({ title: '', content: '', sectorId: '', communityId: '' }); loadAds(); }
      else toast.error(d.error || 'Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const updateAd = async () => {
    if (!editingItem) return; setActionLoading('update-ad');
    try {
      const r = await fetch(`/api/ads/${editingItem._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem) });
      if (r.ok) { toast.success('Annonce mise à jour'); setShowEditModal(false); setEditingItem(null); loadAds(); }
      else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const deleteAd = async (adId: string) => {
    if (!confirm('Supprimer cette annonce ?')) return; setActionLoading(adId);
    try {
      const r = await fetch(`/api/ads/${adId}`, { method: 'DELETE' });
      if (r.ok) { toast.success('Annonce supprimée'); loadAds(); } else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };
  const toggleSponsor = async (adId: string, isSponsored: boolean) => {
    setActionLoading(adId);
    try {
      const r = await fetch('/api/ads/sponsor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adId }) });
      if (r.ok) { toast.success(isSponsored ? 'Sponsor retiré' : 'Sponsorisée'); loadAds(); } else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); } finally { setActionLoading(null); }
  };

  const openEditModal = (item: any, type: string) => { setEditingItem({ ...item, _type: type }); setShowEditModal(true); };

  const renderEditForm = () => {
    if (!editingItem) return null;
    const inputCls = "w-full px-3 py-2.5 text-sm border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] bg-white font-sans";
    const saveBtnCls = "flex-1 py-2.5 bg-[#C9A96E] text-[#0D0B07] text-sm font-semibold rounded-xl hover:bg-[#DFC08A] transition-colors disabled:opacity-50";
    const cancelBtnCls = "flex-1 py-2.5 bg-[#EDE9DF] text-[#1A1712] text-sm font-semibold rounded-xl hover:bg-[#E0DAD0] transition-colors";
    switch (editingItem._type) {
      case 'community': return (
        <div className="space-y-3">
          <input className={inputCls} placeholder="Nom" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
          <input className={inputCls} placeholder="Pays" value={editingItem.country} onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })} />
          {editingItem.type === 'city' && <input className={inputCls} placeholder="Ville" value={editingItem.city || ''} onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })} />}
          <div className="flex gap-3 pt-2">
            <button onClick={updateCommunity} disabled={actionLoading === 'update-community'} className={saveBtnCls}>Enregistrer</button>
            <button onClick={() => setShowEditModal(false)} className={cancelBtnCls}>Annuler</button>
          </div>
        </div>
      );
      case 'sector': return (
        <div className="space-y-3">
          <input className={inputCls} placeholder="Nom du secteur" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
          <input className={inputCls} placeholder="Description" value={editingItem.description || ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
          <input className={inputCls} placeholder="Téléphone président" value={editingItem.presidentPhone} onChange={(e) => setEditingItem({ ...editingItem, presidentPhone: e.target.value })} />
          <input className={inputCls} placeholder="Nom président" value={editingItem.presidentName} onChange={(e) => setEditingItem({ ...editingItem, presidentName: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <button onClick={updateSector} disabled={actionLoading === 'update-sector'} className={saveBtnCls}>Enregistrer</button>
            <button onClick={() => setShowEditModal(false)} className={cancelBtnCls}>Annuler</button>
          </div>
        </div>
      );
      case 'event': return (
        <div className="space-y-3">
          <input className={inputCls} placeholder="Titre" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
          <textarea className={inputCls} placeholder="Description" value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} rows={3} />
          <input className={inputCls} placeholder="Lieu" value={editingItem.location} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} />
          <input type="datetime-local" className={inputCls} value={editingItem.date?.slice(0, 16)} onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })} />
          <label className="flex items-center gap-2 text-sm text-[#1A1712]/70 cursor-pointer">
            <input type="checkbox" checked={editingItem.is_boosted} onChange={(e) => setEditingItem({ ...editingItem, is_boosted: e.target.checked })} className="w-4 h-4 accent-[#C9A96E]" />
            Événement boosté ⭐
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={updateEvent} disabled={actionLoading === 'update-event'} className={saveBtnCls}>Enregistrer</button>
            <button onClick={() => setShowEditModal(false)} className={cancelBtnCls}>Annuler</button>
          </div>
        </div>
      );
      case 'ad': return (
        <div className="space-y-3">
          <input className={inputCls} placeholder="Titre" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
          <textarea className={inputCls} placeholder="Contenu" value={editingItem.content} onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })} rows={4} />
          <div className="flex gap-3 pt-2">
            <button onClick={updateAd} disabled={actionLoading === 'update-ad'} className={saveBtnCls}>Enregistrer</button>
            <button onClick={() => setShowEditModal(false)} className={cancelBtnCls}>Annuler</button>
          </div>
        </div>
      );
      default: return null;
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
      <div className="w-10 h-10 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const cities = communities.filter(c => c.type === 'city');
  const diasporaCountries = communities.filter(c => c.type === 'country');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'users', label: 'Utilisateurs', icon: FiUsers },
    { id: 'communities', label: 'Communautés', icon: FiGlobe },
    { id: 'create-sector', label: 'Créer secteur', icon: FiPlus },
    { id: 'all-sectors', label: 'Secteurs', icon: FiGrid },
    { id: 'events', label: 'Événements', icon: FiCalendar },
    { id: 'ads', label: 'Annonces', icon: FiVolume2 },
  ];

  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label ?? 'Dashboard';
  const inputCls = "w-full px-3 py-2.5 text-sm border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] bg-white font-sans placeholder:text-[#1A1712]/30";
  const selectCls = "w-full px-3 py-2.5 text-sm border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] bg-white font-sans";
  const primaryBtn = "inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A96E] text-[#0D0B07] text-xs font-semibold rounded-xl hover:bg-[#DFC08A] transition-colors disabled:opacity-50";
  const ghostBtn = "inline-flex items-center gap-1.5 px-4 py-2 bg-[#EDE9DF] text-[#1A1712] text-xs font-semibold rounded-xl hover:bg-[#E0DAD0] transition-colors";

  return (
    <div className="min-h-screen bg-[#F4F0E8] font-sans">

      {/* ══════ HEADER ══════ */}
      <div className="bg-gradient-to-r from-[#0D0B07] to-[#1A1712] px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
              <GiCrown className="text-[#C9A96E] text-lg" />
            </div>
            <div>
              <h1 className="font-serif text-[17px] sm:text-xl font-bold text-white leading-tight">Administration</h1>
              <p className="text-white/40 text-[10px] sm:text-xs hidden xs:block">Bangang Connect</p>
            </div>
          </div>
          {/* Sélecteur mobile */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white text-xs rounded-xl border border-white/10"
            >
              <span>{activeTabLabel}</span>
              <FiChevronDown size={12} className={`transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-2xl border border-[#C9A96E]/10 z-50 overflow-hidden">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-left transition-colors ${
                        activeTab === tab.id ? 'bg-[#C9A96E] text-[#0D0B07] font-semibold' : 'text-[#1A1712]/70 hover:bg-[#F4F0E8]'
                      }`}
                    >
                      <Icon size={13} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

        {/* ══════ TABS DESKTOP ══════ */}
        <div className="hidden sm:flex flex-wrap gap-1.5 mb-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive ? 'bg-[#C9A96E] text-[#0D0B07] shadow-sm' : 'bg-white/70 text-[#1A1712]/60 hover:bg-white hover:text-[#1A1712]'
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ══════ DASHBOARD ══════ */}
        {activeTab === 'dashboard' && (
          <div>
            <p className="text-[11px] text-[#1A1712]/40 uppercase tracking-widest mb-3 font-medium">Vue d'ensemble</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {[
                { icon: FiUsers, value: stats.totalUsers, label: 'Utilisateurs' },
                { icon: FiGlobe, value: stats.totalCommunities, label: 'Communautés' },
                { icon: FiGrid, value: stats.totalSectors, label: 'Secteurs' },
                { icon: FiCalendar, value: stats.totalEvents, label: 'Événements' },
                { icon: FiVolume2, value: stats.totalAds, label: 'Annonces' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border border-[#C9A96E]/10 hover:shadow-md hover:border-[#C9A96E]/30 transition-all duration-300">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-2">
                      <Icon size={14} className="text-[#C9A96E]" />
                    </div>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-[#1A1712]">{stat.value}</div>
                    <div className="font-sans text-[10px] text-[#1A1712]/45 mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════ UTILISATEURS ══════ */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-[#C9A96E]/10 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5">
              <SectionHeader icon={FiUsers} title="Utilisateurs" action={
                <button onClick={() => router.push('/admin/users/create')} className={primaryBtn}>
                  <FiUserPlus size={13} /> Créer
                </button>
              } />
            </div>
            {/* Table desktop */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F4F0E8]">
                  <tr>
                    {['Nom', 'Téléphone', 'Rôle', 'Statut', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-[#1A1712]/50 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A96E]/8">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-[#F4F0E8]/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-[#1A1712]">{user.name}</td>
                      <td className="px-4 py-3 text-[#1A1712]/60">{user.phone}</td>
                      <td className="px-4 py-3">
                        <select value={user.role} onChange={(e) => updateUserRole(user._id, e.target.value)}
                          className="px-2 py-1 border border-[#C9A96E]/20 rounded-lg text-xs focus:outline-none focus:border-[#C9A96E] bg-white"
                          disabled={actionLoading === user._id}>
                          <option value="member">Membre</option>
                          <option value="sector_president">Président</option>
                          <option value="community_chief">Chef communauté</option>
                          <option value="village_chief">Chef village</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3"><StatusBadge active={!user.isRestricted} /></td>
                      <td className="px-4 py-3">
                        <ActionBtn onClick={() => deleteUser(user._id)} disabled={actionLoading === user._id} variant="danger" icon={FiTrash2} label="Supprimer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Cards mobile */}
            <div className="sm:hidden divide-y divide-[#C9A96E]/10">
              {users.map((user) => (
                <div key={user._id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#1A1712] text-sm">{user.name}</p>
                      <p className="text-[#1A1712]/50 text-xs mt-0.5">{user.phone}</p>
                    </div>
                    <StatusBadge active={!user.isRestricted} />
                  </div>
                  <select value={user.role} onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-xl text-xs focus:outline-none focus:border-[#C9A96E] bg-[#F4F0E8]"
                    disabled={actionLoading === user._id}>
                    <option value="member">Membre</option>
                    <option value="sector_president">Président</option>
                    <option value="community_chief">Chef communauté</option>
                    <option value="village_chief">Chef village</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                  <ActionBtn onClick={() => deleteUser(user._id)} disabled={actionLoading === user._id} variant="danger" icon={FiTrash2} label="Supprimer" />
                </div>
              ))}
              {users.length === 0 && <p className="text-center py-8 text-[#1A1712]/40 text-sm">Aucun utilisateur</p>}
            </div>
          </div>
        )}

        {/* ══════ COMMUNAUTÉS ══════ */}
        {activeTab === 'communities' && (
          <div className="bg-white rounded-2xl border border-[#C9A96E]/10 shadow-sm p-4 sm:p-5">
            <SectionHeader icon={FiGlobe} title="Communautés" action={
              <button onClick={() => setShowCreateCommunity(!showCreateCommunity)} className={showCreateCommunity ? ghostBtn : primaryBtn}>
                {showCreateCommunity ? <><FiX size={13} /> Annuler</> : <><FiPlus size={13} /> Créer</>}
              </button>
            } />
            {showCreateCommunity && (
              <form onSubmit={createCommunity} className="mb-5 p-4 bg-[#F4F0E8] rounded-xl space-y-3 border border-[#C9A96E]/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="Nom *" value={newCommunity.name} onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })} required />
                  <select className={selectCls} value={newCommunity.type} onChange={(e) => setNewCommunity({ ...newCommunity, type: e.target.value })}>
                    <option value="city">🏙️ Ville (Cameroun)</option>
                    <option value="country">🌍 Pays (Diaspora)</option>
                  </select>
                </div>
                <input className={inputCls} placeholder="Pays *" value={newCommunity.country} onChange={(e) => setNewCommunity({ ...newCommunity, country: e.target.value })} required />
                {newCommunity.type === 'city' && <input className={inputCls} placeholder="Ville" value={newCommunity.city} onChange={(e) => setNewCommunity({ ...newCommunity, city: e.target.value })} />}
                <button type="submit" disabled={actionLoading === 'community'} className={`${primaryBtn} w-full justify-center py-2.5`}>
                  <FiPlus size={13} /> Créer la communauté
                </button>
              </form>
            )}
            <div className="space-y-5">
              {[{ label: `Villes (${cities.length})`, icon: FiMapPin, items: cities, emoji: '📍' },
                { label: `Diaspora (${diasporaCountries.length})`, icon: FiGlobe, items: diasporaCountries, emoji: '🌍' }]
                .map(({ label, icon: Icon, items, emoji }) => (
                  <div key={label}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Icon size={12} className="text-[#C9A96E]" />
                      <span className="text-[11px] font-semibold text-[#C9A96E] uppercase tracking-wider">{label}</span>
                    </div>
                    <div className="space-y-2">
                      {items.length === 0 && <p className="text-xs text-[#1A1712]/40 py-2 pl-2">Aucune entrée</p>}
                      {items.map(c => (
                        <ListRow key={c._id}
                          left={<span className="text-sm text-[#1A1712]">{emoji} {c.name} <span className="text-[#1A1712]/40 text-xs">({c.country})</span></span>}
                          right={<>
                            <ActionBtn onClick={() => openEditModal(c, 'community')} icon={FiEdit2} label="Modifier" />
                            <ActionBtn onClick={() => deleteCommunity(c._id)} disabled={actionLoading === c._id} variant="danger" icon={FiTrash2} label="Supprimer" />
                          </>}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ══════ CRÉER SECTEUR ══════ */}
        {activeTab === 'create-sector' && (
          <div className="bg-white rounded-2xl border border-[#C9A96E]/10 shadow-sm p-4 sm:p-5">
            <SectionHeader icon={FiPlus} title="Créer un secteur" />
            {cities.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 text-center">
                ⚠️ Créez d'abord une ville dans l'onglet "Communautés"
              </div>
            ) : (
              <form onSubmit={createSector} className="space-y-3 max-w-lg">
                <input className={inputCls} placeholder="Nom du secteur *" value={newSector.name} onChange={(e) => setNewSector({ ...newSector, name: e.target.value })} required />
                <textarea className={inputCls} placeholder="Description" value={newSector.description} onChange={(e) => setNewSector({ ...newSector, description: e.target.value })} rows={3} />
                <select className={selectCls} required value={newSector.communityId} onChange={(e) => setNewSector({ ...newSector, communityId: e.target.value })}>
                  <option value="">Sélectionner une ville</option>
                  {cities.map(c => <option key={c._id} value={c._id}>📍 {c.name}</option>)}
                </select>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="Téléphone président *" value={newSector.presidentPhone} onChange={(e) => setNewSector({ ...newSector, presidentPhone: e.target.value })} required />
                  <input className={inputCls} placeholder="Nom président *" value={newSector.presidentName} onChange={(e) => setNewSector({ ...newSector, presidentName: e.target.value })} required />
                </div>
                <label className="flex items-center gap-2.5 text-sm text-[#1A1712]/60 cursor-pointer select-none">
                  <input type="checkbox" checked={newSector.sendInvitation} onChange={(e) => setNewSector({ ...newSector, sendInvitation: e.target.checked })} className="w-4 h-4 accent-[#C9A96E]" />
                  Envoyer une invitation au président
                </label>
                <button type="submit" disabled={actionLoading === 'create-sector'} className={`${primaryBtn} w-full justify-center py-2.5`}>
                  <FiPlus size={13} /> Créer le secteur
                </button>
              </form>
            )}
          </div>
        )}

        {/* ══════ TOUS LES SECTEURS ══════ */}
        {activeTab === 'all-sectors' && (
          <div className="bg-white rounded-2xl border border-[#C9A96E]/10 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5">
              <SectionHeader icon={FiGrid} title="Secteurs" />
            </div>
            {sectors.length === 0 ? (
              <p className="text-center py-10 text-[#1A1712]/40 text-sm">Aucun secteur</p>
            ) : (
              <>
                {/* Table desktop */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F4F0E8]">
                      <tr>
                        {['Secteur', 'Ville', 'Président', 'Membres', 'Actions'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-[#1A1712]/50 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C9A96E]/8">
                      {sectors.map(s => (
                        <tr key={s._id} className="hover:bg-[#F4F0E8]/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-[#1A1712]">{s.name}</td>
                          <td className="px-4 py-3 text-[#1A1712]/60">{s.communityId?.name || '—'}</td>
                          <td className="px-4 py-3 text-[#1A1712]/60">{s.presidentName}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#C9A96E]/10 text-[#C9A96E] text-xs rounded-full font-medium">
                              <FiUsers size={9} /> {s.membersCount}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <ActionBtn onClick={() => openEditModal(s, 'sector')} icon={FiEdit2} label="Modifier" />
                              <ActionBtn onClick={() => deleteSector(s._id)} disabled={actionLoading === s._id} variant="danger" icon={FiTrash2} label="Supprimer" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Cards mobile */}
                <div className="sm:hidden divide-y divide-[#C9A96E]/10">
                  {sectors.map(s => (
                    <div key={s._id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-[#1A1712] text-sm">{s.name}</p>
                          <p className="text-[#1A1712]/50 text-xs mt-0.5">{s.communityId?.name || '—'} · {s.presidentName}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#C9A96E]/10 text-[#C9A96E] text-[10px] rounded-full font-medium flex-shrink-0">
                          <FiUsers size={9} /> {s.membersCount}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <ActionBtn onClick={() => openEditModal(s, 'sector')} icon={FiEdit2} label="Modifier" />
                        <ActionBtn onClick={() => deleteSector(s._id)} disabled={actionLoading === s._id} variant="danger" icon={FiTrash2} label="Supprimer" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ══════ ÉVÉNEMENTS ══════ */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl border border-[#C9A96E]/10 shadow-sm p-4 sm:p-5">
            <SectionHeader icon={FiCalendar} title="Événements" action={
              <button onClick={() => setShowCreateEvent(!showCreateEvent)} className={showCreateEvent ? ghostBtn : primaryBtn}>
                {showCreateEvent ? <><FiX size={13} /> Annuler</> : <><FiPlus size={13} /> Créer</>}
              </button>
            } />
            {showCreateEvent && (
              <form onSubmit={createEvent} className="mb-5 p-4 bg-[#F4F0E8] rounded-xl space-y-3 border border-[#C9A96E]/10">
                <input className={inputCls} placeholder="Titre *" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                <textarea className={inputCls} placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} rows={3} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="datetime-local" className={inputCls} value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                  <input className={inputCls} placeholder="Lieu *" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
                </div>
                <select className={selectCls} value={newEvent.sectorId} onChange={(e) => setNewEvent({ ...newEvent, sectorId: e.target.value })} required>
                  <option value="">Sélectionner un secteur</option>
                  {sectors.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                <label className="flex items-center gap-2.5 text-sm text-[#1A1712]/60 cursor-pointer select-none">
                  <input type="checkbox" checked={newEvent.is_boosted} onChange={(e) => setNewEvent({ ...newEvent, is_boosted: e.target.checked })} className="w-4 h-4 accent-[#C9A96E]" />
                  ⭐ Booster l'événement
                </label>
                <button type="submit" disabled={actionLoading === 'event'} className={`${primaryBtn} w-full justify-center py-2.5`}>
                  Créer l'événement
                </button>
              </form>
            )}
            <div className="space-y-2">
              {events.length === 0 && <p className="text-center py-8 text-[#1A1712]/40 text-sm">Aucun événement</p>}
              {events.map(e => (
                <ListRow key={e._id} highlight={e.is_boosted}
                  left={
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-[#1A1712] text-sm">{e.title}</p>
                        {e.is_boosted && <span className="text-[10px] px-1.5 py-0.5 bg-[#C9A96E] text-[#0D0B07] rounded-full font-semibold">⭐ Boosté</span>}
                      </div>
                      <p className="text-[#1A1712]/50 text-xs mt-0.5">{new Date(e.date).toLocaleDateString('fr-FR')} · {e.location}</p>
                      <p className="text-[#1A1712]/35 text-[10px] mt-0.5">{e.participants?.length || 0} participant(s)</p>
                    </div>
                  }
                  right={<>
                    <ActionBtn onClick={() => openEditModal(e, 'event')} icon={FiEdit2} label="Modifier" />
                    <ActionBtn onClick={() => deleteEvent(e._id)} disabled={actionLoading === e._id} variant="danger" icon={FiTrash2} label="Supprimer" />
                  </>}
                />
              ))}
            </div>
          </div>
        )}

        {/* ══════ ANNONCES ══════ */}
        {activeTab === 'ads' && (
          <div className="bg-white rounded-2xl border border-[#C9A96E]/10 shadow-sm p-4 sm:p-5">
            <SectionHeader icon={FiVolume2} title="Annonces" action={
              <button onClick={() => setShowCreateAd(!showCreateAd)} className={showCreateAd ? ghostBtn : primaryBtn}>
                {showCreateAd ? <><FiX size={13} /> Annuler</> : <><FiPlus size={13} /> Créer</>}
              </button>
            } />
            {showCreateAd && (
              <form onSubmit={createAd} className="mb-5 p-4 bg-[#F4F0E8] rounded-xl space-y-3 border border-[#C9A96E]/10">
                <input className={inputCls} placeholder="Titre *" value={newAd.title} onChange={(e) => setNewAd({ ...newAd, title: e.target.value })} required />
                <textarea className={inputCls} placeholder="Contenu *" value={newAd.content} onChange={(e) => setNewAd({ ...newAd, content: e.target.value })} rows={3} required />
                <button type="submit" disabled={actionLoading === 'ad'} className={`${primaryBtn} w-full justify-center py-2.5`}>
                  Créer l'annonce
                </button>
              </form>
            )}
            <div className="space-y-2">
              {ads.length === 0 && <p className="text-center py-8 text-[#1A1712]/40 text-sm">Aucune annonce</p>}
              {ads.map(a => (
                <ListRow key={a._id} highlight={a.is_sponsored}
                  left={
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-[#1A1712] text-sm">{a.title}</p>
                        {a.is_sponsored && <span className="text-[10px] px-1.5 py-0.5 bg-[#C9A96E] text-[#0D0B07] rounded-full font-semibold">⭐ Sponsorisée</span>}
                      </div>
                      <p className="text-[#1A1712]/50 text-xs mt-0.5 line-clamp-2">{a.content}</p>
                    </div>
                  }
                  right={<>
                    <ActionBtn onClick={() => openEditModal(a, 'ad')} icon={FiEdit2} label="Modifier" />
                    <ActionBtn onClick={() => toggleSponsor(a._id, a.is_sponsored)} disabled={actionLoading === a._id} variant="success" icon={FiUserPlus} label={a.is_sponsored ? 'Retirer' : 'Sponsoriser'} />
                    <ActionBtn onClick={() => deleteAd(a._id)} disabled={actionLoading === a._id} variant="danger" icon={FiTrash2} label="Supprimer" />
                  </>}
                />
              ))}
            </div>
          </div>
        )}

        {/* ══════ MODAL ÉDITION ══════ */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            {/* Bottom sheet sur mobile, modal centré sur sm+ */}
            <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-[#C9A96E]/10 rounded-t-2xl">
                <h2 className="font-serif text-lg font-bold text-[#1A1712]">Modifier</h2>
                <button onClick={() => setShowEditModal(false)} className="w-8 h-8 rounded-full bg-[#F4F0E8] flex items-center justify-center text-[#1A1712]/60 hover:text-[#1A1712] transition-colors">
                  <FiX size={16} />
                </button>
              </div>
              <div className="p-5">{renderEditForm()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}