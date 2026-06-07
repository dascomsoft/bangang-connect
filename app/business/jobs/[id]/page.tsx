'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { 
  FiBriefcase, FiMapPin, FiPhone, FiMail, FiClock, 
  FiCalendar, FiDollarSign, FiArrowLeft, FiEdit, FiTrash2,
  FiCheck, FiEye
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface Job {
  _id: string;
  title: string;
  companyName: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  contractType: string;
  isSponsored: boolean;
  deadline: string;
  companyLogo?: string;
  email: string;
  phone: string;
  whatsapp: string;
  ownerId?: string;
  companyId?: string;
  createdAt: string;
  views: number;
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
    fetchJob();
  }, []);

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${params.id}`);
      
      if (!res.ok) {
        toast.error('Offre non trouvée');
        router.push('/business');
        return;
      }
      
      const data = await res.json();
      console.log('Job data:', data); // 🔍 Debug
      setJob(data);
    } catch (error) {
      console.error(error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const isJobOwner = (): boolean => {
    if (!user || !job) return false;
    if (user.role === 'super_admin') return true;
    return job.ownerId === user._id || job.companyId === user._id;
  };

  const handleDelete = async () => {
    if (!confirm('Voulez-vous vraiment supprimer cette offre ?')) return;
    
    try {
      const res = await fetch(`/api/jobs/${job?._id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Offre supprimée');
        router.push('/business');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: `Offre d'emploi : ${job?.title} chez ${job?.companyName}`,
          url: url,
        });
      } catch (err) {
        console.log('Partage annulé');
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Lien copié !');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
        <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F0E8] gap-4">
        <FiBriefcase className="text-6xl text-[#C9A96E]/40" />
        <p className="font-sans text-[#1A1712]/60">Offre non trouvée</p>
        <Button onClick={() => router.push('/business')} className="bg-[#C9A96E] text-[#0D0B07]">
          Retour aux offres
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F0E8] font-sans">
      {/* Header */}
      <div className="bg-white border-b border-[#C9A96E]/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#1A1712]/60 hover:text-[#C9A96E] transition-colors"
          >
            <FiArrowLeft size={20} />
            <span className="text-sm">Retour</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-sm border border-[#C9A96E]/30 rounded-lg hover:bg-[#C9A96E]/10 transition-colors"
            >
              🔗 Partager
            </button>
            {isJobOwner() && (
              <>
                <button
                  onClick={() => router.push(`/business?tab=jobs&edit=${job._id}`)}
                  className="p-2 bg-[#EDE9DF] hover:bg-[#C9A96E]/20 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <FiTrash2 size={16} className="text-red-600" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-5 py-8">
        <div className="bg-white rounded-2xl border border-[#C9A96E]/10 shadow-sm overflow-hidden">
          
          {/* En-tête de l'offre */}
          <div className="p-6 md:p-8 border-b border-[#C9A96E]/10 bg-gradient-to-r from-[#F4F0E8]/50 to-white">
            <div className="flex items-start gap-4">
              {/* Logo entreprise */}
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={job.companyName}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#C9A96E]/20 flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center flex-shrink-0">
                  <FiBriefcase size={32} className="text-[#C9A96E]" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-[#EDE9DF] text-[#1A1712]/70 px-2 py-1 rounded">
                    {job.contractType}
                  </span>
                  {job.isSponsored && (
                    <span className="text-xs font-medium bg-[#C9A96E] text-[#0D0B07] px-2 py-1 rounded">
                      ⭐ Sponsor
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1712] mb-2">
                  {job.title}
                </h1>
                <p className="text-lg text-[#1A1712]/70">{job.companyName}</p>
              </div>
            </div>

            {/* Infos rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div className="flex items-center gap-2 text-sm text-[#1A1712]/60">
                <FiMapPin size={16} className="text-[#C9A96E] flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-2 text-sm text-[#1A1712]/60">
                  <FiDollarSign size={16} className="text-[#C9A96E] flex-shrink-0" />
                  <span className="truncate">{job.salary}</span>
                </div>
              )}
              {job.deadline && (
                <div className="flex items-center gap-2 text-sm text-[#1A1712]/60">
                  <FiCalendar size={16} className="text-[#C9A96E] flex-shrink-0" />
                  <span className="truncate">Limite : {formatDate(job.deadline)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-[#1A1712]/60">
                <FiBriefcase size={16} className="text-[#C9A96E] flex-shrink-0" />
                <span className="truncate">{job.contractType}</span>
              </div>
            </div>
          </div>

          {/* Corps */}
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Description */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1712] mb-4 flex items-center gap-2">
                📋 Description du poste
              </h2>
              <div className="text-[#1A1712]/70 leading-relaxed whitespace-pre-wrap font-sans">
                {job.description}
              </div>
            </div>

            {/* Prérequis */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1A1712] mb-4 flex items-center gap-2">
                  ✅ Prérequis
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#1A1712]/70">
                      <FiCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 📞 CONTACTS DIRECTS - Affichage simple */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1712] mb-4 flex items-center gap-2">
                📞 Contacts
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {/* Téléphone */}
                {job.phone ? (
                  <a
                    href={`tel:${job.phone}`}
                    className="flex items-center gap-3 px-5 py-3 bg-white border border-[#C9A96E]/20 rounded-xl hover:border-[#C9A96E] hover:bg-[#F4F0E8] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center group-hover:bg-[#C9A96E]/20 transition-colors">
                      <FiPhone size={18} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">Téléphone</p>
                      <p className="text-sm font-semibold text-[#1A1712]">{job.phone}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-3 bg-white border border-[#C9A96E]/10 rounded-xl opacity-50">
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center">
                      <FiPhone size={18} className="text-[#C9A96E]/40" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">Téléphone</p>
                      <p className="text-sm text-[#1A1712]/40">Non renseigné</p>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {job.whatsapp ? (
                  <a
                    href={`https://wa.me/${job.whatsapp}?text=Bonjour, je suis intéressé(e) par l'offre "${job.title}"`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl hover:bg-[#25D366]/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <FaWhatsapp size={18} className="text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-sm font-semibold text-[#25D366]">{job.whatsapp}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-3 bg-white border border-[#C9A96E]/10 rounded-xl opacity-50">
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center">
                      <FaWhatsapp size={18} className="text-[#C9A96E]/40" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-sm text-[#1A1712]/40">Non renseigné</p>
                    </div>
                  </div>
                )}

                {/* Email */}
                {job.email ? (
                  <a
                    href={`mailto:${job.email}?subject=Candidature : ${job.title}`}
                    className="flex items-center gap-3 px-5 py-3 bg-white border border-[#C9A96E]/20 rounded-xl hover:border-[#C9A96E] hover:bg-[#F4F0E8] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center group-hover:bg-[#C9A96E]/20 transition-colors">
                      <FiMail size={18} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-semibold text-[#1A1712]">{job.email}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-3 bg-white border border-[#C9A96E]/10 rounded-xl opacity-50">
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center">
                      <FiMail size={18} className="text-[#C9A96E]/40" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">Email</p>
                      <p className="text-sm text-[#1A1712]/40">Non renseigné</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#C9A96E]/10">
              {job.phone && (
                <a href={`tel:${job.phone}`} className="flex-1">
                  <Button className="w-full bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                    <FiPhone size={16} className="mr-2" />
                    Appeler
                  </Button>
                </a>
              )}
              {job.whatsapp && (
                <a 
                  href={`https://wa.me/${job.whatsapp}?text=Bonjour, je suis intéressé(e) par l'offre "${job.title}"`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1"
                >
                  <Button className="w-full bg-[#25D366] text-white hover:bg-[#20B859]">
                    <FaWhatsapp size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                </a>
              )}
              {job.email && (
                <a href={`mailto:${job.email}?subject=Candidature : ${job.title}`} className="flex-1">
                  <Button className="w-full bg-[#1A1712] text-white hover:bg-[#333]">
                    <FiMail size={16} className="mr-2" />
                    Envoyer un email
                  </Button>
                </a>
              )}
            </div>

            {/* Infos supplémentaires */}
            <div className="flex items-center justify-center gap-4 text-xs text-[#1A1712]/40 pt-4">
              <span className="flex items-center gap-1">
                <FiEye size={12} />
                {job.views || 0} vues
              </span>
              <span>•</span>
              <span>Publié le {formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}