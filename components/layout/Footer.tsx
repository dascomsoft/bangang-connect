'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube,
  FaWhatsapp, FaTelegram, FaTiktok, FaGithub, FaDiscord
} from 'react-icons/fa';
import { 
  FiMail, FiPhone, FiMapPin, FiClock, FiSend, 
  FiHeart, FiGlobe, FiUsers, FiBriefcase, FiCalendar,
  FiBookOpen, FiMusic, 
} from 'react-icons/fi';
import { MdDashboard, MdChat, MdSecurity } from 'react-icons/md';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [sending, setSending] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error('Veuillez entrer votre email');
      return;
    }
    
    setSending(true);
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      
      if (response.ok) {
        toast.success('Inscription à la newsletter réussie !');
        setNewsletterEmail('');
      } else {
        toast.error('Erreur lors de l\'inscription');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com/bangangconnect', color: 'hover:bg-[#1877F2]' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/bangangconnect', color: 'hover:bg-[#1DA1F2]' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/bangangconnect', color: 'hover:bg-[#E4405F]' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com/company/bangangconnect', color: 'hover:bg-[#0077B5]' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com/@bangangconnect', color: 'hover:bg-[#FF0000]' },
    { name: 'WhatsApp', icon: FaWhatsapp, url: 'https://whatsapp.com/channel/...', color: 'hover:bg-[#25D366]' },
    { name: 'Telegram', icon: FaTelegram, url: 'https://t.me/bangangconnect', color: 'hover:bg-[#26A5E4]' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com/@bangangconnect', color: 'hover:bg-[#000000]' },
  ];

  const quickLinks = [
    { name: 'Accueil', href: '/', icon: FiGlobe },
    { name: 'Histoire', href: '/history', icon: FiBookOpen },
    { name: 'Culture', href: '/culture', icon: FiMusic },
    { name: 'Actualités', href: '/news'},
    { name: 'Événements', href: '/events', icon: FiCalendar },
    { name: 'Business', href: '/business', icon: FiBriefcase },
    { name: 'Communauté', href: '/community', icon: FiUsers },
    { name: 'Dashboard', href: '/dashboard', icon: MdDashboard },
    { name: 'Chat', href: '/chat', icon: MdChat },
  ];

  const resourcesLinks = [
    { name: 'À propos', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Aide', href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partenaires', href: '/partners' },
    { name: 'Presse', href: '/press' },
    { name: 'Carrières', href: '/careers' },
  ];

  const legalLinks = [
    { name: 'Conditions d\'utilisation', href: '/terms' },
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Charte de modération', href: '/moderation' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Restez connecté avec Bangang</h3>
            <p className="text-gray-400 mb-6">
              Recevez nos actualités, événements et opportunités directement dans votre boîte mail
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Inscription...</span>
                  </>
                ) : (
                  <>
                    <FiSend />
                    <span>S'abonner</span>
                  </>
                )}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              En vous inscrivant, vous acceptez de recevoir nos emails. Vous pouvez vous désinscrire à tout moment.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Colonne 1 - Logo et description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/banganglogo.png"
                alt="BangangConnect Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-xl font-bold">
                Bangang<span className="text-blue-500">Connect</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              La première plateforme numérique dédiée à la communauté Bangang. 
              Connecter, partager et développer notre patrimoine ensemble.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white text-gray-400`}
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiGlobe size={18} className="text-blue-500" />
              Liens rapides
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-500 transition flex items-center gap-2 text-sm"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Colonne 3 - Ressources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiBookOpen size={18} className="text-blue-500" />
              Ressources
            </h4>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-500 transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Contact & Infos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiMapPin size={18} className="text-blue-500" />
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FiMapPin className="mt-0.5 flex-shrink-0" />
                <span>Bangang, Cameroun</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FiPhone className="flex-shrink-0" />
                <a href="tel:+237699999999" className="hover:text-blue-500">+237 699 999 999</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FiMail className="flex-shrink-0" />
                <a href="mailto:contact@bangangconnect.com" className="hover:text-blue-500">contact@bangangconnect.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FiClock className="flex-shrink-0" />
                <span>Support: 24h/24, 7j/7</span>
              </li>
            </ul>

            {/* Badges de sécurité */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <MdSecurity size={16} className="text-green-500" />
                <span>Site 100% sécurisé</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs mt-2">
                <FiHeart size={16} className="text-red-500" />
                <span>Fait avec ❤️ pour Bangang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              &copy; {currentYear} Bangang Connect. Tous droits réservés.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-blue-500 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Version 1.0</span>
              <span>•</span>
              <span>Made in 🇨🇲</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}