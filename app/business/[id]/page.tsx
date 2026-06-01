'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  FiMapPin, FiPhone, FiClock, FiAward,
  FiEdit2, FiTrash2, FiX, FiArrowLeft,
  FiCheckCircle, FiChevronLeft, FiChevronRight,
  FiStar,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

/* ─── tiny helpers ─────────────────────────────────────────── */
const gold  = '#C9A96E';
const dark  = '#0D0B07';
const ink   = '#1A1712';
const parch = '#F4F0E8';
const cream = '#EDE9DF';

const CATEGORY_ICONS: Record<string, string> = {
  agriculture: '🌾', commerce: '🛒', services: '💼',
  tech: '💻', artisanat: '🎨', restauration: '🍽️',
};

interface Business {
  _id: string; businessName: string; category: string;
  description: string; phone: string; whatsapp?: string;
  location: string; city: string; logo: string; images: string[];
  isSponsored: boolean; isVerified: boolean; views: number;
  ownerId: { name: string; photo: string; _id: string };
  status: string; createdAt: string;
}

/* ─── decorative rule ──────────────────────────────────────── */
function Rule({ style }: { style?: React.CSSProperties }) {
  return <div style={{ height: 1, background: `linear-gradient(to right, transparent, rgba(201,169,110,.35), transparent)`, ...style }} />;
}

/* ─── section label ────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{ width: 20, height: 1, background: gold, flexShrink: 0 }} />
      <span style={{ fontFamily: '"DM Sans",sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: gold }}>
        {children}
      </span>
    </div>
  );
}

/* ─── contact row ──────────────────────────────────────────── */
function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: `1px solid rgba(201,169,110,.1)` }}>
      <div style={{ width: 36, height: 36, background: cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: gold }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${ink}55`, marginBottom: 2 }}>{label}</div>
        <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: 14, fontWeight: 400, color: ink }}>{value}</div>
      </div>
    </div>
  );
}

/* ─── main page ────────────────────────────────────────────── */
export default function BusinessDetailPage() {
  const params  = useParams();
  const router  = useRouter();

  const [business, setBusiness]       = useState<Business | null>(null);
  const [loading, setLoading]         = useState(true);
  const [user, setUser]               = useState<any>(null);
  const [showEdit, setShowEdit]       = useState(false);
  const [editing, setEditing]         = useState(false);
  const [activeIdx, setActiveIdx]     = useState(0);
  const [lightbox, setLightbox]       = useState(false);
  const modalRef                      = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchUser(); fetchBusiness(); }, [params.id]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowEdit(false); setLightbox(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const fetchUser = async () => {
    const r = await fetch('/api/auth/me');
    if (r.ok) { const d = await r.json(); setUser(d.user); }
  };

  const fetchBusiness = async () => {
    try {
      const r = await fetch(`/api/businesses/${params.id}`);
      if (r.ok) { const d = await r.json(); setBusiness(d); }
      else { toast.error('Entreprise non trouvée'); router.push('/business'); }
    } catch { toast.error('Erreur de chargement'); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer cette entreprise ?')) return;
    const r = await fetch(`/api/businesses/${params.id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Supprimée'); router.push('/business'); }
    else toast.error('Erreur lors de la suppression');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setEditing(true);
    try {
      const r = await fetch(`/api/businesses/${params.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(business),
      });
      if (r.ok) { toast.success('Mise à jour'); setShowEdit(false); fetchBusiness(); }
      else toast.error('Erreur');
    } catch { toast.error('Erreur serveur'); }
    finally { setEditing(false); }
  };

  const step = (dir: 1 | -1) => {
    if (!business) return;
    const imgs = allImages(business);
    setActiveIdx(i => (i + dir + imgs.length) % imgs.length);
  };

  /* ── loading ── */
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: parch }}>
      <div style={{ width: 40, height: 40, border: `1.5px solid ${gold}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!business) return (
    <div style={{ minHeight: '100vh', background: parch, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans",sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏪</div>
        <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 28, color: ink, marginBottom: 8 }}>Entreprise introuvable</h1>
        <p style={{ color: `${ink}60`, marginBottom: 28 }}>Cette fiche n'existe plus ou a été supprimée.</p>
        <button onClick={() => router.push('/business')} style={{ padding: '12px 28px', background: gold, color: dark, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
          Retour à l'annuaire
        </button>
      </div>
    </div>
  );

  const imgs    = allImages(business);
  const current = imgs[activeIdx] ?? null;
  const isOwner = user?._id === business.ownerId?._id;
  const isAdmin = user?.role === 'super_admin';
  const canEdit = isOwner || isAdmin;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinAnim{to{transform:rotate(360deg)}}
        .fade-up{animation:fadeUp .55s cubic-bezier(.4,0,.2,1) both}
        .delay-1{animation-delay:.08s}
        .delay-2{animation-delay:.16s}
        .delay-3{animation-delay:.24s}
        .btn-ghost:hover{background:rgba(201,169,110,.12)!important}
        input,select,textarea{appearance:none;font-family:"DM Sans",sans-serif}
        input:focus,select:focus,textarea:focus{outline:none;border-color:${gold}!important}
        /* Hide scrollbar on thumb strip */
        .thumb-strip::-webkit-scrollbar{display:none}
        .thumb-strip{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      <main style={{ minHeight: '100vh', background: parch, fontFamily: '"DM Sans",sans-serif' }}>

        {/* ═══════════════════════════════════════════════════
            HERO IMAGE
        ═══════════════════════════════════════════════════ */}
        <div style={{ position: 'relative', height: 'clamp(300px,52vh,640px)', overflow: 'hidden', background: dark }}>
          {current
            ? <img src={current} alt={business.businessName} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.82) saturate(.9)', transition: 'opacity .45s ease' }} />
            : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${dark},#2a2318)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, opacity: .25 }}>{CATEGORY_ICONS[business.category] ?? '🏪'}</div>
          }

          {/* Gradient */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${parch} 0%, transparent 45%)` }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.45) 0%, transparent 35%)' }} />

          {/* Back btn */}
          <button onClick={() => router.back()} className="btn-ghost" style={{
            position: 'absolute', top: 20, left: 24, display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(13,11,7,.45)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,.12)', padding: '8px 16px',
            color: 'rgba(255,255,255,.85)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
            transition: 'background .25s',
          }}>
            <FiArrowLeft size={14} /> Retour
          </button>

          {/* Edit / Delete — top right */}
          {canEdit && (
            <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', gap: 8 }}>
              <button onClick={() => setShowEdit(true)} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(13,11,7,.45)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,.15)', padding: '8px 16px',
                color: 'rgba(255,255,255,.85)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
              }}>
                <FiEdit2 size={12} /> Modifier
              </button>
              <button onClick={handleDelete} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(200,30,30,.5)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,80,80,.25)', padding: '8px 16px',
                color: 'rgba(255,255,255,.9)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
              }}>
                <FiTrash2 size={12} /> Supprimer
              </button>
            </div>
          )}

          {/* Gallery nav arrows */}
          {imgs.length > 1 && <>
            <button onClick={() => step(-1)} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(13,11,7,.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,.12)', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
              <FiChevronLeft size={20} />
            </button>
            <button onClick={() => step(1)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(13,11,7,.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,.12)', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
              <FiChevronRight size={20} />
            </button>
            {/* Counter */}
            <div style={{ position: 'absolute', bottom: 72, right: 24, fontFamily: '"Cormorant Garamond",serif', fontSize: 13, color: 'rgba(255,255,255,.55)', letterSpacing: '0.1em' }}>
              {String(activeIdx + 1).padStart(2,'0')} / {String(imgs.length).padStart(2,'0')}
            </div>
          </>}

          {/* Thumbnail strip */}
          {imgs.length > 1 && (
            <div className="thumb-strip" style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', gap: 8, overflowX: 'auto', padding: '0 24px' }}>
              {imgs.map((img, i) => (
                <button key={i} onClick={() => setActiveIdx(i)} style={{
                  flexShrink: 0, width: 52, height: 52, overflow: 'hidden', padding: 0, border: 'none', cursor: 'pointer',
                  outline: i === activeIdx ? `2px solid ${gold}` : '2px solid transparent',
                  outlineOffset: 2, opacity: i === activeIdx ? 1 : 0.55, transition: 'all .25s',
                }}>
                  <img src={img} alt={`img ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════
            IDENTITY STRIP — logo + name + badges
        ═══════════════════════════════════════════════════ */}
        <div className="fade-up" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginTop: -20, position: 'relative', zIndex: 10, flexWrap: 'wrap' }}>
            {/* Logo */}
            <div style={{ width: 72, height: 72, flexShrink: 0, background: business.logo && business.logo !== '/default-business.png' ? '#fff' : `linear-gradient(135deg,${gold},#DFC08A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(13,11,7,.18)', overflow: 'hidden' }}>
              {business.logo && business.logo !== '/default-business.png'
                ? <img src={business.logo} alt={business.businessName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 28 }}>{CATEGORY_ICONS[business.category] ?? '🏪'}</span>
              }
            </div>

            <div style={{ flex: 1, paddingTop: 24 }}>
              {/* Name */}
              <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(22px,4vw,38px)', fontWeight: 700, color: ink, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 8 }}>
                {business.businessName}
              </h1>
              {/* Meta row */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: gold, fontWeight: 500 }}>{business.category}</span>
                <div style={{ width: 1, height: 12, background: `rgba(201,169,110,.4)` }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: `${ink}60`, fontSize: 12 }}>
                  <FiMapPin size={11} /> {business.city}
                </div>
                {business.isVerified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', border: `1px solid rgba(201,169,110,.3)`, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: gold }}>
                    <FiCheckCircle size={10} /> Vérifié
                  </div>
                )}
                {business.isSponsored && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: `rgba(201,169,110,.1)`, border: `1px solid rgba(201,169,110,.25)`, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: gold }}>
                    <FiStar size={10} /> Sponsorisé
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            BODY — 2-col layout
        ═══════════════════════════════════════════════════ */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px,5vh,56px) clamp(20px,5vw,56px) 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}
          className="detail-grid">

          {/* ── LEFT ── */}
          <div className="fade-up delay-1">
            <Rule style={{ marginBottom: 40 }} />

            {/* About */}
            <section style={{ marginBottom: 40 }}>
              <Label>À propos</Label>
              <p style={{ fontSize: 15, fontWeight: 300, color: `${ink}BB`, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
                {business.description}
              </p>
            </section>

            <Rule style={{ marginBottom: 40 }} />

            {/* Info grid */}
            <section>
              <Label>Informations</Label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${ink}50`, marginBottom: 6 }}>Date d'inscription</div>
                  <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 18, color: ink, fontWeight: 600 }}>
                    {new Date(business.createdAt).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${ink}50`, marginBottom: 6 }}>Visibilité</div>
                  <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 18, color: ink, fontWeight: 600 }}>
                    {business.views.toLocaleString('fr-FR')} vues
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT — sticky contact card ── */}
          <aside className="fade-up delay-2" style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: '#fff', border: `1px solid rgba(201,169,110,.18)`, padding: '32px 28px' }}>
              <Label>Contacter</Label>

              <ContactRow icon={<FiPhone size={15} />} label="Téléphone" value={business.phone} />
              {business.whatsapp && <ContactRow icon={<FaWhatsapp size={15} />} label="WhatsApp" value={business.whatsapp} />}
              <ContactRow icon={<FiMapPin size={15} />} label="Adresse" value={`${business.location}, ${business.city}`} />

              {/* CTA buttons */}
              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={() => (window.location.href = `tel:${business.phone}`)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  padding: '14px 0', background: gold, color: dark, border: 'none',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'background .25s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#DFC08A')}
                  onMouseLeave={e => (e.currentTarget.style.background = gold)}
                >
                  <FiPhone size={14} /> Appeler
                </button>
                {business.whatsapp && (
                  <button onClick={() => window.open(`https://wa.me/${business.whatsapp}`, '_blank')} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                    padding: '14px 0', background: '#25D366', color: '#fff', border: 'none',
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'background .25s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#20B859')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
                  >
                    <FaWhatsapp size={16} /> WhatsApp
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* ═══════════════════════════════════════════════════
            EDIT MODAL
        ═══════════════════════════════════════════════════ */}
        {showEdit && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,11,7,.65)', backdropFilter: 'blur(6px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div ref={modalRef} style={{ background: '#fff', width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', animation: 'fadeUp .3s both' }}>
              {/* Modal header */}
              <div style={{ position: 'sticky', top: 0, background: '#fff', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid rgba(201,169,110,.15)`, zIndex: 2 }}>
                <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 22, fontWeight: 700, color: ink }}>Modifier l'entreprise</h2>
                <button onClick={() => setShowEdit(false)} style={{ background: 'none', border: 'none', color: `${ink}70`, cursor: 'pointer', padding: 4 }}>
                  <FiX size={22} />
                </button>
              </div>

              <form onSubmit={handleUpdate} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Field helper */}
                {([
                  { label: 'Nom de l\'entreprise', key: 'businessName', type: 'text', required: true },
                  { label: 'Téléphone', key: 'phone', type: 'tel', required: true },
                  { label: 'WhatsApp', key: 'whatsapp', type: 'text', required: false },
                  { label: 'Ville', key: 'city', type: 'text', required: true },
                  { label: 'Localisation', key: 'location', type: 'text', required: true },
                ] as Array<{ label: string; key: keyof Business; type: string; required: boolean }>).map(f => (
                  <div key={String(f.key)}>
                    <FieldLabel>{f.label}</FieldLabel>
                    <input
                      type={f.type}
                      value={(business as any)[f.key] || ''}
                      onChange={e => setBusiness({ ...business!, [f.key]: e.target.value })}
                      required={f.required}
                      style={inputStyle}
                    />
                  </div>
                ))}

                {/* Category select */}
                <div>
                  <FieldLabel>Catégorie</FieldLabel>
                  <select value={business.category} onChange={e => setBusiness({ ...business, category: e.target.value })} style={inputStyle}>
                    {Object.entries(CATEGORY_ICONS).map(([k, v]) => (
                      <option key={k} value={k}>{v} {k.charAt(0).toUpperCase() + k.slice(1)}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <textarea
                    value={business.description}
                    onChange={e => setBusiness({ ...business, description: e.target.value })}
                    rows={5}
                    required
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                  />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                  <button type="submit" disabled={editing} style={{
                    padding: '13px 28px', background: gold, color: dark, border: 'none',
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
                    cursor: editing ? 'not-allowed' : 'pointer', opacity: editing ? .7 : 1,
                  }}>
                    {editing ? 'Enregistrement…' : 'Enregistrer'}
                  </button>
                  <button type="button" onClick={() => setShowEdit(false)} style={{
                    padding: '13px 28px', background: 'transparent', color: `${ink}80`,
                    border: `1px solid rgba(201,169,110,.3)`, fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            LIGHTBOX
        ═══════════════════════════════════════════════════ */}
        {lightbox && current && (
          <div ref={modalRef} style={{ position: 'fixed', inset: 0, background: 'rgba(5,4,2,.96)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'rgba(255,255,255,.7)', cursor: 'pointer' }}><FiX size={28} /></button>
            <button onClick={() => step(-1)} style={{ position: 'absolute', left: 20, background: 'none', border: 'none', color: 'rgba(255,255,255,.55)', cursor: 'pointer' }}><FiChevronLeft size={44} /></button>
            <img src={current} alt={business.businessName} style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain' }} />
            <button onClick={() => step(1)} style={{ position: 'absolute', right: 20, background: 'none', border: 'none', color: 'rgba(255,255,255,.55)', cursor: 'pointer' }}><FiChevronRight size={44} /></button>
            <div style={{ position: 'absolute', bottom: 24, fontFamily: '"Cormorant Garamond",serif', fontSize: 14, color: 'rgba(255,255,255,.4)', letterSpacing: '0.08em' }}>
              {activeIdx + 1} / {imgs.length}
            </div>
          </div>
        )}

        {/* Responsive grid breakpoint */}
        <style>{`
          @media(max-width:768px){
            .detail-grid{
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}

/* ─── utils ─────────────────────────────────────────────────── */
function allImages(b: Business): string[] {
  if (b.images?.length) return b.images;
  if (b.logo && b.logo !== '/default-business.png') return [b.logo];
  return [];
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  border: '1px solid rgba(201,169,110,.22)',
  fontSize: 14, color: '#1A1712',
  fontFamily: '"DM Sans",sans-serif',
  background: '#FAFAF8',
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: `#1A171280`, marginBottom: 6 }}>{children}</div>;
}