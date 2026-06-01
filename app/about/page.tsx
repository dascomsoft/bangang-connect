// import {
//   FaGlobeAfrica,
//   FaUsers,
//   FaComments,
//   FaCalendarAlt,
//   FaBriefcase,
//   FaBullhorn,
//   FaHandshake,
//   FaRocket,
//   FaArrowRight,
//   FaChartLine,
//   FaLightbulb,
//   FaShieldAlt,
//   FaNetworkWired,
// } from 'react-icons/fa';

// export default function AboutBangangConnect() {
//   const stats = [
//     { value: '10+', label: 'Régions du Cameroun' },
//     { value: '5+', label: 'Pays de la diaspora' },
//     { value: '24/7', label: 'Connexion communautaire' },
//     { value: '100%', label: 'Vision communautaire' },
//   ];

//   const features = [
//     {
//       title: 'Communautés & Secteurs',
//       desc: 'Organisation intelligente des membres par communautés, villes, pays et secteurs afin de faciliter les échanges et les rencontres.',
//       icon: FaGlobeAfrica,
//     },
//     {
//       title: 'Chat Temps Réel',
//       desc: 'Messagerie instantanée avec Socket.io pour permettre une communication fluide entre les membres.',
//       icon: FaComments,
//     },
//     {
//       title: 'Événements & Réunions',
//       desc: 'Création et gestion des événements communautaires avec système de participation et boost.',
//       icon: FaCalendarAlt,
//     },
//     {
//       title: 'Espace Économique',
//       desc: 'Promotion des entrepreneurs Bangang, annonces professionnelles, opportunités et réseautage.',
//       icon: FaBriefcase,
//     },
//   ];


// const values = [
//   {
//     title: (
//       <div className="flex items-center gap-3">
//         <FaUsers className="text-green-300" />
//         Unité
//       </div>
//     ),
//     desc: "Rassembler tous les fils et filles Bangang autour d’une plateforme moderne et collaborative.",
//   },
//   {
//     title: (
//       <div className="flex items-center gap-3">
//         <FaHandshake className="text-green-300" />
//         Solidarité
//       </div>
//     ),
//     desc: "Favoriser l’entraide, le partage et le soutien entre les membres de la communauté.",
//   },
//   {
//     title: (
//       <div className="flex items-center gap-3">
//         <FaLightbulb className="text-green-300" />
//         Innovation
//       </div>
//     ),
//     desc: "Utiliser les technologies modernes pour développer et connecter la diaspora Bangang.",
//   },
//   {
//     title: (
//       <div className="flex items-center gap-3">
//         <FaRocket className="text-green-300" />
//         Développement
//       </div>
//     ),
//     desc: "Créer un impact économique et social positif à travers le numérique.",
//   },
// ];

//   return (
//     <main className="bg-white text-gray-900 overflow-hidden">
//       {/* HERO */}
//       <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white px-6">
//         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_white,_transparent_40%)]" />

//         <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center py-24">
//           <div>
//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-sm">
//               <FaGlobeAfrica className="text-lg" /> Plateforme Communautaire Bangang
//             </div>

//             <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
//               Connecter la diaspora Bangang à travers le monde.
//             </h1>

//             <p className="text-lg md:text-xl text-green-50 leading-relaxed max-w-2xl mb-8">
//               Bangang Connect est une plateforme communautaire moderne conçue pour rapprocher les fils et filles Bangang du Cameroun et de la diaspora grâce à la communication, la collaboration et l’innovation numérique.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <button className="bg-white text-green-700 px-7 py-4 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition">
//                 <span className="flex items-center gap-2">Rejoindre la communauté <FaArrowRight /></span>
//               </button>

//               <button className="border border-white/40 px-7 py-4 rounded-2xl font-semibold hover:bg-white/10 transition">
//                 <span className="flex items-center gap-2">Explorer la plateforme <FaArrowRight /></span>
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl">
//               <div className="grid grid-cols-2 gap-5">
//                 {stats.map((item, index) => (
//                   <div
//                     key={index}
//                     className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center"
//                   >
//                     <h3 className="text-4xl font-black mb-2">{item.value}</h3>
//                     <p className="text-green-100 text-sm">{item.label}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-8 bg-white/10 rounded-2xl p-5 border border-white/10">
//                 <p className="text-sm uppercase tracking-widest text-green-100 mb-2">
//                   Vision
//                 </p>
//                 <p className="text-lg leading-relaxed">
//                   Construire un écosystème numérique communautaire permettant aux Bangang du monde entier de communiquer, collaborer, entreprendre et grandir ensemble.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ABOUT */}
//       <section className="py-28 px-6">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <span className="text-green-700 font-bold uppercase tracking-[0.3em] text-sm">
//               À propos
//             </span>

//             <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
//               Une plateforme pensée pour l’unité et le développement de la communauté Bangang.
//             </h2>

//             <p className="text-gray-600 text-lg leading-relaxed mt-8">
//               Bangang Connect est née d’un besoin réel : rapprocher les membres de la communauté Bangang dispersés entre le Cameroun et la diaspora internationale.
//             </p>

//             <p className="text-gray-600 text-lg leading-relaxed mt-5">
//               Grâce à une infrastructure moderne basée sur Next.js, MongoDB et Socket.io, la plateforme facilite les échanges, l’organisation des événements, le réseautage économique et la collaboration communautaire.
//             </p>

//             <div className="mt-10 grid sm:grid-cols-2 gap-5">
//               <div className="p-5 rounded-2xl border border-gray-200">
//                 <h3 className="font-bold text-xl mb-2">🌍 Diaspora Connectée</h3>
//                 <p className="text-gray-600">
//                   Relier les Bangang du Cameroun, d’Europe, d’Amérique et d’ailleurs.
//                 </p>
//               </div>

//               <div className="p-5 rounded-2xl border border-gray-200">
//                 <h3 className="font-bold text-xl mb-2">🚀 Technologie Moderne</h3>
//                 <p className="text-gray-600">
//                   Une expérience rapide, fluide et responsive sur mobile et desktop.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-[2rem] p-10 shadow-xl">
//               <div className="space-y-6">
//                 <div className="bg-white rounded-2xl p-6 shadow-md">
//                   <h3 className="font-black text-2xl mb-2"><FaComments className="inline mr-2 text-green-700" /> Communication</h3>
//                   <p className="text-gray-600">
//                     Chats communautaires et échanges en temps réel.
//                   </p>
//                 </div>

//                 <div className="bg-white rounded-2xl p-6 shadow-md">
//                   <h3 className="font-black text-2xl mb-2"><FaCalendarAlt className="inline mr-2 text-green-700" /> Organisation</h3>
//                   <p className="text-gray-600">
//                     Gestion des secteurs, événements et réunions.
//                   </p>
//                 </div>

//                 <div className="bg-white rounded-2xl p-6 shadow-md">
//                   <h3 className="font-black text-2xl mb-2"><FaBriefcase className="inline mr-2 text-green-700" /> Opportunités</h3>
//                   <p className="text-gray-600">
//                     Promotion des activités économiques et mise en relation.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="py-28 bg-gray-50 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-3xl mx-auto mb-20">
//             <span className="text-green-700 font-bold uppercase tracking-[0.3em] text-sm">
//               Fonctionnalités
//             </span>

//             <h2 className="text-4xl md:text-5xl font-black mt-4">
//               Une expérience communautaire complète.
//             </h2>

//             <p className="text-gray-600 text-lg mt-6 leading-relaxed">
//               Bangang Connect combine réseau social, communication temps réel, organisation communautaire et développement économique dans une seule plateforme.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-all duration-300"
//               >
//                 <div className="text-5xl mb-6 text-green-700">
//                   <feature.icon />
//                 </div>
//                 <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ECONOMY */}
//       <section className="py-28 px-6">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
//           <div className="bg-gradient-to-br from-green-700 to-teal-700 text-white rounded-[2rem] p-10 shadow-2xl">
//             <span className="uppercase tracking-[0.3em] text-sm text-green-100 font-semibold">
//               Espace économique
//             </span>

//             <h2 className="text-4xl font-black mt-5 leading-tight">
//               Développer l’économie Bangang grâce au numérique.
//             </h2>

//             <p className="text-green-50 text-lg mt-6 leading-relaxed">
//               La plateforme intègre un espace dédié aux entrepreneurs, commerçants, freelances et investisseurs afin de créer un véritable réseau économique communautaire.
//             </p>

//             <div className="mt-10 space-y-4">
//               <div className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl">
//                 <span className="text-2xl"><FaBullhorn className="text-2xl" /></span>
//                 <div>
//                   <h3 className="font-bold">Publicité & visibilité</h3>
//                   <p className="text-green-100 text-sm">
//                     Mise en avant des activités économiques Bangang.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl">
//                 <span className="text-2xl"><FaHandshake className="text-2xl" /></span>
//                 <div>
//                   <h3 className="font-bold">Réseautage</h3>
//                   <p className="text-green-100 text-sm">
//                     Connexion entre entrepreneurs et partenaires.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl">
//                 <span className="text-2xl"><FaBriefcase className="text-2xl" /></span>
//                 <div>
//                   <h3 className="font-bold">Opportunités d’emploi</h3>
//                   <p className="text-green-100 text-sm">
//                     Création d’opportunités pour la jeunesse et la diaspora.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h2 className="text-4xl md:text-5xl font-black leading-tight">
//               Plus qu’un réseau social.
//             </h2>

//             <p className="text-gray-600 text-lg leading-relaxed mt-8">
//               Bangang Connect ambitionne de devenir une véritable infrastructure numérique communautaire capable de soutenir les initiatives locales, les projets économiques et les collaborations internationales.
//             </p>

//             <div className="mt-10 space-y-6">
//               <div className="border-l-4 border-green-600 pl-5">
//                 <h3 className="font-black text-xl"><FaChartLine className="inline mr-2 text-green-700" /> Développement local</h3>
//                 <p className="text-gray-600 mt-2">
//                   Encourager les investissements et initiatives communautaires.
//                 </p>
//               </div>

//               <div className="border-l-4 border-green-600 pl-5">
//                 <h3 className="font-black text-xl"><FaNetworkWired className="inline mr-2 text-green-700" /> Réseau mondial</h3>
//                 <p className="text-gray-600 mt-2">
//                   Créer des connexions fortes entre le Cameroun et la diaspora.
//                 </p>
//               </div>

//               <div className="border-l-4 border-green-600 pl-5">
//                 <h3 className="font-black text-xl"><FaRocket className="inline mr-2 text-green-700" /> Innovation communautaire</h3>
//                 <p className="text-gray-600 mt-2">
//                   Utiliser la technologie pour moderniser les échanges communautaires.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* VALUES */}
//       <section className="py-28 bg-gray-950 text-white px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-3xl mx-auto mb-20">
//             <span className="text-green-400 font-bold uppercase tracking-[0.3em] text-sm">
//               Nos valeurs
//             </span>

//             <h2 className="text-4xl md:text-5xl font-black mt-4">
//               Les fondations de Bangang Connect.
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm"
//               >
//                 <h3 className="text-2xl font-black mb-4 text-green-300">
//                   {value.title}
//                 </h3>
//                 <p className="text-gray-300 leading-relaxed">
//                   {value.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-28 px-6">
//         <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-700 to-teal-700 rounded-[2.5rem] p-12 md:p-16 text-white text-center shadow-2xl">
//           <h2 className="text-4xl md:text-6xl font-black leading-tight">
//             Rejoignez l’avenir numérique de la communauté Bangang.
//           </h2>

//           <p className="text-lg text-green-100 max-w-3xl mx-auto mt-8 leading-relaxed">
//             Connectez-vous, échangez, participez aux événements, développez votre réseau et contribuez à la croissance de la communauté Bangang partout dans le monde.
//           </p>

//           <div className="flex flex-wrap justify-center gap-4 mt-10">
//             <button className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
//               <span className="flex items-center gap-2">Créer un compte <FaArrowRight /></span>
//             </button>

//             <button className="border border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition">
//               <span className="flex items-center gap-2">Découvrir les communautés <FaArrowRight /></span>
//             </button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }





































































































'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { 
  FiBookOpen, FiMusic, FiMapPin, FiUsers, FiBriefcase, 
  FiShield, FiGlobe, FiHeart, FiStar, FiTrendingUp, 
  FiAward, FiCompass, FiHome, FiCalendar, FiMessageCircle,
  FiCoffee, FiCamera, FiCloud, FiSun, FiMoon
} from 'react-icons/fi';

// ─── Composants ──────────────────────────────────────────────

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-8 h-px ${light ? 'bg-[#C9A96E]/70' : 'bg-[#C9A96E]'}`} />
      <span className={`font-sans text-[10px] font-medium tracking-[0.28em] uppercase ${light ? 'text-[#C9A96E]/85' : 'text-[#C9A96E]'}`}>
        {children}
      </span>
    </div>
  );
}

function HorizontalRule() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
  );
}

function ValueCard({ icon: Icon, title, value, description }: { icon: any; title: string; value: string; description: string }) {
  return (
    <div className="bg-[#0D0B07] p-6 sm:p-8 rounded-2xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A96E]/20 transition-colors">
        <Icon className="w-6 h-6 text-[#C9A96E]" />
      </div>
      <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C9A96E] mb-2">{value}</div>
      <h3 className="font-serif text-lg font-semibold text-[#F5EDD8] mb-2">{title}</h3>
      <p className="font-sans text-[13px] text-[#F5EDD8]/45 leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const stats = [
    { icon: FiUsers, value: '+2k', title: 'Membres', description: 'Utilisateurs actifs sur la plateforme' },
    { icon: FiGlobe, value: '+15', title: 'Secteurs', description: 'Communautés locales connectées' },
    { icon: FiBriefcase, value: '+50', title: 'Entreprises', description: 'Annuaire économique local' },
    { icon: FiCalendar, value: '24/7', title: 'Disponibilité', description: 'Support et accès permanent' },
  ];

  const pillars = [
    {
      icon: FiBookOpen,
      title: 'Patrimoine & Histoire',
      description: 'Préservation de la mémoire collective et transmission de l\'héritage royal aux générations futures.',
      features: ['Histoire dynastique', 'Symboles royaux', 'Lieux sacrés', 'Récits ancestraux']
    },
    {
      icon: FiMusic,
      title: 'Culture & Identité',
      description: 'Valorisation des traditions, danses, rites et artisanat pour promouvoir l\'identité Bangang.',
      features: ['Danses traditionnelles', 'Cérémonies', 'Artisanat', 'Langue locale']
    },
    {
      icon: FiMapPin,
      title: 'Tourisme & Nature',
      description: 'Découverte des richesses naturelles et sites emblématiques du territoire.',
      features: ['Massif des Bamboutos', 'Chutes de Mekoup', 'Lacs sacrés', 'Grassfields']
    },
    {
      icon: FiUsers,
      title: 'Réseau Communautaire',
      description: 'Plateforme sociale locale pour les échanges et le partage d\'informations.',
      features: ['Actualités', 'Événements', 'Annonces', 'Chat par secteur']
    },
    {
      icon: FiBriefcase,
      title: 'Économie Locale',
      description: 'Soutien à la visibilité des entreprises et artisans du territoire.',
      features: ['Commerce', 'Artisanat', 'Services', 'PME locales']
    },
    {
      icon: FiShield,
      title: 'Gouvernance Moderne',
      description: 'Accompagnement de la modernisation et de la communication institutionnelle.',
      features: ['Informations officielles', 'Projets de développement', 'Communication']
    },
  ];

  const values = [
    { icon: FiHeart, title: 'Transmission', description: 'Préserver et partager l\'héritage culturel Bangang' },
    { icon: FiUsers, title: 'Unité', description: 'Rassembler la communauté autour d\'une vision commune' },
    { icon: FiStar, title: 'Excellence', description: 'Promouvoir les talents et savoir-faire locaux' },
    { icon: FiTrendingUp, title: 'Développement', description: 'Accompagner la transformation numérique du royaume' },
    { icon: FiAward, title: 'Authenticité', description: 'Valoriser l\'identité culturelle dans sa pureté' },
    { icon: FiCompass, title: 'Rayonnement', description: 'Faire découvrir Bangang au Cameroun et dans le monde' },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-[#F4F0E8] font-sans">
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background parallax */}
        <div
          className="absolute inset-[-10%]"
          style={!isMobile ? { transform: `translateY(${scrollY * 0.2}px)` } : undefined}
        >
          <Image
            src="/roibangang1.jpg"
            alt="Royaume Bangang"
            fill
            priority
            className="object-cover object-center brightness-50 saturate-75"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
                Qui sommes-nous ?
              </span>
            </div>

            <h1 className="font-serif text-[clamp(48px,12vw,96px)] font-bold text-[#F5EDD8] leading-[1.05] tracking-[-0.02em] mb-6">
              À propos de{' '}
              <em className="italic text-[#C9A96E]">BangangConnect</em>
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-[#C9A96E]/60" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/60">
                Plateforme communautaire & culturelle
              </span>
              <div className="w-16 h-px bg-[#C9A96E]/60" />
            </div>

            <p className="font-serif text-[clamp(18px,2.5vw,28px)] italic text-[#F5EDD8]/80 leading-relaxed max-w-3xl mx-auto">
              La première plateforme numérique dédiée à la valorisation du royaume de Bangang
              et de son patrimoine historique, humain, économique et touristique.
            </p>
          </div>
        </div>

        {/* Bottom fade */}
      </section>

      {/* ══════════════════════════════════════════════════════
          INTRODUCTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel>Notre Mission</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight tracking-[-0.02em] mb-6">
                Créer un <span className="text-[#C9A96E]">écosystème digital</span><br />
                au service du Royaume
              </h2>
              <p className="font-sans text-[15px] text-[#1A1712]/60 leading-relaxed mb-6">
                BangangConnect est une plateforme numérique communautaire et culturelle 
                dédiée à la valorisation du royaume de Bangang et de son patrimoine 
                historique, humain, économique et touristique.
              </p>
              <p className="font-sans text-[15px] text-[#1A1712]/60 leading-relaxed mb-8">
                L'objectif principal est de créer un véritable écosystème digital du royaume, 
                capable de connecter les habitants, la diaspora, les visiteurs, les investisseurs, 
                les associations et les autorités traditionnelles autour d'une même plateforme moderne.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-[#C9A96E]" />
                <span className="font-serif text-lg italic text-[#1A1712]/70">
                  Une vitrine officielle du royaume
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/bams.jpg"
                  alt="BangangConnect Vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#C9A96E]/40 rounded-br-2xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#C9A96E]/40 rounded-tl-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS CARDS
      ══════════════════════════════════════════════════════ */}
      <section className="py-[clamp(48px,8vh,80px)] px-5 sm:px-8 lg:px-20 bg-[#EDE9DF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-[#C9A96E]/10">
                <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-[#C9A96E]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1712] mb-1">{stat.value}</div>
                <div className="font-sans text-sm font-semibold text-[#1A1712] mb-1">{stat.title}</div>
                <div className="font-sans text-xs text-[#1A1712]/50">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VISION GLOBALE
      ══════════════════════════════════════════════════════ */}
      <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Positionnement</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] font-bold text-[#1A1712] leading-tight">
              Une plateforme <span className="text-[#C9A96E]">multidimensionnelle</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: FiShield, title: 'Portail institutionnel' },
              { icon: FiBookOpen, title: 'Média culturel' },
              { icon: FiUsers, title: 'Réseau communautaire' },
              { icon: FiMapPin, title: 'Découverte touristique' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/30 rounded-xl border border-[#C9A96E]/10">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <span className="font-sans text-sm font-medium text-[#1A1712]">{item.title}</span>
              </div>
            ))}
          </div>

          <p className="font-serif text-center text-xl italic text-[#1A1712]/60 max-w-4xl mx-auto leading-relaxed">
            « BangangConnect est la plateforme numérique officielle de promotion culturelle, 
            touristique, économique et communautaire du royaume Bangang, conçue pour préserver 
            son héritage tout en accompagnant sa transformation numérique. »
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PILIERS DU PROJET (7 axes)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0D0B07] py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 relative overflow-hidden">
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#C9A96E]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel light>Notre ADN</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] font-bold text-[#F5EDD8] leading-tight">
              Les 7 piliers de <em className="italic text-[#C9A96E]">BangangConnect</em>
            </h2>
            <p className="font-sans text-[15px] text-[#F5EDD8]/45 max-w-3xl mx-auto mt-4">
              Une plateforme complète au service de la communauté Bangang, 
              de son patrimoine et de son développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="bg-[#0D0B07] p-6 sm:p-8 rounded-2xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A96E]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#F5EDD8] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[13px] text-[#F5EDD8]/45 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.features.map((feature, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-1 bg-[#C9A96E]/10 text-[#C9A96E]/70 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DIASPORA BANGANG
      ══════════════════════════════════════════════════════ */}
      <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <SectionLabel>Diaspora Bangang</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight tracking-[-0.02em] mb-6">
                Rapprocher la <span className="text-[#C9A96E]">communauté</span><br />
                où qu'elle se trouve
              </h2>
              <p className="font-sans text-[15px] text-[#1A1712]/60 leading-relaxed mb-6">
                Un axe important de BangangConnect est de rapprocher les habitants du royaume,
                les ressortissants vivant dans d'autres villes du Cameroun et la diaspora internationale.
              </p>
              <div className="space-y-4">
                {['Investissements communautaires', 'Projets de développement', 'Transmission culturelle', 'Initiatives collectives'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                    <span className="font-sans text-[14px] text-[#1A1712]/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/bams3.jpg"
                  alt="Diaspora Bangang"
                  fill
                  className="object-cover brightness-90"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#C9A96E]/40 rounded-bl-2xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[#C9A96E]/40 rounded-tr-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NOS VALEURS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#1A1712] py-[clamp(60px,12vh,120px)] px-5 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel light>Nos Valeurs</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4.5vw,48px)] font-bold text-[#F5EDD8] leading-tight">
              Ce qui nous <em className="italic text-[#C9A96E]">anime</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-[#0D0B07] p-6 rounded-xl border border-[#C9A96E]/10 text-center hover:border-[#C9A96E]/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#F5EDD8] mb-2">{value.title}</h3>
                  <p className="font-sans text-[13px] text-[#F5EDD8]/45 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[400px] flex items-center justify-center text-center py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/roibangang.jpg"
            alt=""
            fill
            className="object-cover brightness-[0.25] saturate-70"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C9A96E]/60 mb-6">
            ◈ &nbsp; Rejoignez l'aventure &nbsp; ◈
          </div>

          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-bold text-[#F5EDD8] leading-tight mb-6">
            Ensemble, construisons le numérique<br />
            <em className="italic text-[#C9A96E]">au service de notre identité</em>
          </h2>

          <p className="font-sans text-[15px] text-[#F5EDD8]/50 leading-relaxed mb-10 max-w-2xl mx-auto">
            Rejoignez la communauté BangangConnect et participez à la valorisation 
            et au rayonnement du royaume Bangang.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] hover:gap-4 active:scale-[0.98]"
            >
              Créer un compte
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#C9A96E]/40 text-[#F5EDD8] font-sans text-[12px] font-normal tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E]/80 hover:gap-4 active:scale-[0.98]"
            >
              Nous contacter
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}