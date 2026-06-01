'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { 
  FiMail, FiPhone, FiMapPin, FiHeart, FiGlobe, 
  FiBookOpen, FiMusic, FiCalendar, FiBriefcase, 
  FiUsers, FiMessageCircle, FiRadio, FiArrowUp,
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiLinkedin, FiStar, FiShield, FiClock
} from 'react-icons/fi';
import { FaFacebookF, FaYoutube, FaWhatsapp, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { GiCrown, GiAfrica } from 'react-icons/gi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0D0B07] text-white">
      {/* Bande décorative dorée */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Colonne 1 — Logo & description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-md" />
                <Image
                  src="/banganglogo.png"
                  alt="Bangang Connect"
                  width={50}
                  height={50}
                  className="relative rounded-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  Bangang<span className="text-[#C9A96E]">Connect</span>
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-sans">
                  Royaume & Communauté
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 font-sans">
              La plateforme numérique de la communauté Bangang — un pont entre le Cameroun et la diaspora mondiale.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              <SocialIcon href="#" icon={<FaFacebookF size={14} />} label="Facebook" />
              <SocialIcon href="#" icon={<FaYoutube size={14} />} label="YouTube" />
              <SocialIcon href="#" icon={<FaWhatsapp size={14} />} label="WhatsApp" />
              <SocialIcon href="#" icon={<FaTwitter size={14} />} label="Twitter" />
              <SocialIcon href="#" icon={<FaInstagram size={14} />} label="Instagram" />
            </div>

            {/* Badge radio */}
            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <FiRadio className="text-[#C9A96E] text-sm" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">Radio Émergent</span>
              </div>
              <p className="text-sm text-white/70 font-medium">99.5 FM — Bangang</p>
              <p className="text-xs text-white/40 mt-1">Voix du Royaume Bangang</p>
            </div>
          </div>

          {/* Colonne 2 — Explorer */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E] mb-5 flex items-center gap-2">
              <FiBookOpen size={12} />
              Explorer
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil', icon: FiGlobe },
                { href: '/history', label: 'Histoire', icon: FiBookOpen },
                { href: '/culture', label: 'Culture & Patrimoine', icon: FiMusic },
                { href: '/news', label: 'Actualités', icon: FiStar },
                { href: '/events', label: 'Événements', icon: FiCalendar },
                { href: '/business', label: 'Annuaire Business', icon: FiBriefcase },
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-white/50 hover:text-[#C9A96E] text-sm transition-all duration-300"
                  >
                    <Icon size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Communauté */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E] mb-5 flex items-center gap-2">
              <FiUsers size={12} />
              Communauté
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/sectors', label: 'Nos Secteurs', icon: FiGlobe },
                { href: '/community', label: 'Communautés', icon: FiUsers },
                { href: '/chat', label: 'Chat', icon: FiMessageCircle },
                { href: '/ads', label: 'Annonces', icon: FiStar },
                { href: '/register', label: 'Rejoindre', icon: FiHeart },
                { href: '/login', label: 'Se connecter', icon: FiShield },
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-white/50 hover:text-[#C9A96E] text-sm transition-all duration-300"
                  >
                    <Icon size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E] mb-5 flex items-center gap-2">
              <FiMail size={12} />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50 hover:text-white/70 transition-colors duration-300">
                <FiMapPin size={16} className="text-[#C9A96E] mt-0.5 shrink-0" />
                <span>Bangang, Département des Bamboutos<br />Région de l'Ouest, Cameroun</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50 hover:text-white/70 transition-colors duration-300">
                <FiPhone size={16} className="text-[#C9A96E] shrink-0" />
                <a href="tel:+2376XXXXXXX" className="hover:text-[#C9A96E] transition-colors">+237 6XX XXX XXX</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50 hover:text-white/70 transition-colors duration-300">
                <FiMail size={16} className="text-[#C9A96E] shrink-0" />
                <a href="mailto:contact@bangangconnect.cm" className="hover:text-[#C9A96E] transition-colors">
                  contact@bangangconnect.cm
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <FiClock size={16} className="text-[#C9A96E] shrink-0" />
                <span>Support: 24h/24, 7j/7</span>
              </li>
            </ul>

            {/* Badge de sécurité */}
            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <GiCrown className="text-[#C9A96E] text-sm" />
                <span className="text-xs text-white/60">Sous le leadership de</span>
              </div>
              <p className="text-sm text-white/80 font-medium mt-1">S.M. Momo Keubou Serges Evariste</p>
              <p className="text-xs text-white/40">19e Roi du Royaume Bangang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs text-center font-sans">
            © {currentYear} BangangConnect. Tous droits réservés.
          </p>
          <p className="text-white/30 text-[10px] text-center font-sans flex items-center gap-1">
            Fait avec <FiHeart size={10} className="text-red-500" /> pour la communauté Bangang
          </p>
        </div>
      </div>

      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#C9A96E] text-[#0D0B07] flex items-center justify-center hover:bg-[#DFC08A] transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
          aria-label="Retour en haut"
        >
          <FiArrowUp size={18} />
        </button>
      )}
    </footer>
  );
}

// Composant SocialIcon réutilisable
function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C9A96E] flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label={label}
    >
      <span className="text-white/60 group-hover:text-[#0D0B07] transition-colors duration-300">
        {icon}
      </span>
    </a>
  );
}