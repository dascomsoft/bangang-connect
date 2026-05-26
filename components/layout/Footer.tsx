'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">

      {/* BANDE DÉCORATIVE */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600" />

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COLONNE 1 — LOGO & DESCRIPTION */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/banganglogo.png"
                alt="Bangang Connect"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <span className="text-xl font-bold tracking-tight">
                Bangang<span className="text-yellow-400">Connect</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La plateforme numérique de la communauté Bangang — un pont entre le Cameroun et la diaspora mondiale.
            </p>
            {/* RÉSEAUX SOCIAUX */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-500 flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-500 flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <FaYoutube size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-500 flex items-center justify-center transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={15} />
              </a>
            </div>
          </div>

          {/* COLONNE 2 — NAVIGATION */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-400 mb-5">
              Explorer
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/history', label: 'Histoire' },
                { href: '/culture', label: 'Culture & Patrimoine' },
                { href: '/news', label: 'Actualités' },
                { href: '/events', label: 'Événements' },
                { href: '/business', label: 'Annuaire Business' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 — COMMUNAUTÉ */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-400 mb-5">
              Communauté
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/sectors', label: 'Nos Secteurs' },
                { href: '/community', label: 'Communautés' },
                { href: '/chat', label: 'Chat' },
                { href: '/ads', label: 'Annonces' },
                { href: '/register', label: 'Rejoindre' },
                { href: '/login', label: 'Se connecter' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 4 — CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-400 mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                <span>Bangang, Département des Bamboutos<br />Région de l'Ouest, Cameroun</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone size={16} className="text-yellow-400 shrink-0" />
                <span>+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail size={16} className="text-yellow-400 shrink-0" />
                <a href="mailto:contact@bangangconnect.cm" className="hover:text-yellow-400 transition-colors">
                  contact@bangangconnect.cm
                </a>
              </li>
            </ul>

            {/* RADIO */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-yellow-400 font-semibold uppercase tracking-wider mb-1">
                📻 Radio Émergent
              </p>
              <p className="text-sm text-gray-300 font-medium">99.5 FM — Bangang</p>
              <p className="text-xs text-gray-500 mt-1">Voix du Royaume Bangang</p>
            </div>
          </div>

        </div>
      </div>

      {/* BARRE BAS */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs text-center">
            © {currentYear} BangangConnect. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-xs text-center">
            Sous le leadership de{' '}
            <span className="text-yellow-500/80">S.M. Momo Keubou Serges Evariste</span>
            {' '}— 19e Roi du Royaume Bangang
          </p>
        </div>
      </div>

    </footer>
  );
}