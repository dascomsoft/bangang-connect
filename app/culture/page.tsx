// 'use client';

// import Image from "next/image";
// import Link from "next/link";
// import Card from "@/components/ui/Card";

// import {
//   FaLandmark,
//   FaWater,
//   FaMusic,
//   FaUniversity,
//   FaCrown,
//   FaBroadcastTower
// } from "react-icons/fa";

// import { GiAfrica } from "react-icons/gi";

// export default function CulturePage() {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">

//       {/* ================= HERO ================= */}
//       <section
//         className="relative h-[90vh] bg-cover bg-center"
//         style={{ backgroundImage: "url('/mekoup.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

//         <div className="relative container mx-auto px-6 h-full flex items-center">
//           <div className="text-white max-w-5xl">

//             <div className="flex items-center gap-3 text-green-300 mb-4">
//               <GiAfrica className="text-2xl" />
//               <span className="uppercase tracking-[0.35em] text-sm">
//                 Patrimoine culturel & spirituel
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-black">
//               Culture Bangang
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-3xl">
//               Un patrimoine vivant, mystique et en pleine renaissance
//             </p>

//             <div className="mt-10 flex gap-4">
//               <Link
//                 href="#patrimoine"
//                 className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl transition font-semibold"
//               >
//                 Explorer le patrimoine
//               </Link>

//               <Link
//                 href="/histoire"
//                 className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition"
//               >
//                 Voir l’histoire
//               </Link>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ================= INTRO ================= */}
//       <section className="py-24 container mx-auto px-6 max-w-4xl text-center">

//         <FaLandmark className="text-4xl text-green-600 mx-auto mb-6" />

//         <p className="text-lg text-gray-700 leading-relaxed">
//           La culture Bangang est riche, spirituelle et profondément ancrée dans les traditions Ngyemboon.
//           Elle constitue le socle de l’identité du peuple et se manifeste à travers ses sites sacrés,
//           ses rites, ses arts et son organisation sociale.
//         </p>

//       </section>

//       {/* ================= SITES SACRES ================= */}
//       <section id="patrimoine" className="bg-gray-50 py-24">

//         <div className="text-center mb-16">
//           <FaWater className="text-4xl text-blue-600 mx-auto mb-4" />
//           <h2 className="text-3xl font-bold">
//             Hauts lieux du patrimoine culturel
//           </h2>
//         </div>

//         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">

//           {/* MEKOUP */}
//           <Card className="overflow-hidden group">
//             <div className="relative h-72">
//               <Image
//                 src="/mekoup1.jpg"
//                 alt="Chute de Mekoup"
//                 fill
//                 className="object-cover group-hover:scale-105 transition duration-500"
//               />
//             </div>

//             <div className="p-6">
//               <h3 className="text-2xl font-bold mb-2">
//                 La Chute de Mekoup
//               </h3>

//               <p className="text-gray-700 mb-4">
//                 Située à environ 8 km du palais royal, cette chute majestueuse d’environ
//                 <strong> 200 mètres de hauteur</strong> est l’un des sites les plus emblématiques de l’Ouest Cameroun.
//               </p>

//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>Forêt sacrée protégée depuis des siècles</li>
//                 <li>Lieu de culte et de pèlerinage</li>
//                 <li>Sacrifices et bénédictions aux ancêtres</li>
//               </ul>
//             </div>
//           </Card>

//           {/* MEPIBUEA */}
//           <Card className="overflow-hidden group">
//             <div className="relative h-72">
//               <Image
//                 src="/Mepibwa-Bangang.jpg"
//                 alt="Chutes jumelles de Mepibuea"
//                 fill
//                 className="object-cover group-hover:scale-105 transition duration-500"
//               />
//             </div>

//             <div className="p-6">
//               <h3 className="text-2xl font-bold mb-2">
//                 Chutes jumelles de Mepibuea
//               </h3>

//               <p className="text-gray-700">
//                 Lieu sacré aux vertus spirituelles particulières, symbolisant la dualité et la fertilité.
//               </p>
//             </div>
//           </Card>

//         </div>
//       </section>

//       {/* ================= CHEFFERIE ================= */}
//       <section className="grid md:grid-cols-2 gap-12 items-center py-24 px-6">

//         <div>
//           <FaUniversity className="text-4xl text-green-600 mb-4" />

//           <h2 className="text-3xl font-bold mb-4">
//             La Chefferie Royale
//           </h2>

//           <p className="text-gray-700 leading-relaxed">
//             Cœur spirituel et administratif du groupement, actuellement en reconstruction et modernisation.
//           </p>
//         </div>

//         <div className="relative h-80 rounded-2xl overflow-hidden">
//           <Image
//             src="/Entrée-palais-royal-Bangang.jpg"
//             alt="Chefferie royale"
//             fill
//             className="object-cover"
//           />
//         </div>

//       </section>

//       {/* ================= PATRIMOINE IMMATERIEL ================= */}
//       <section className="py-24 bg-gray-50">

//         <div className="text-center mb-12">
//           <FaMusic className="text-4xl text-green-600 mx-auto mb-4" />
//           <h2 className="text-3xl font-bold">
//             Patrimoine immatériel
//           </h2>
//         </div>

//         <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

//           <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
//             <h3 className="font-bold">Danses & musiques</h3>
//             <p className="text-sm text-gray-600 mt-2">Rythmes ancestraux et cérémonies royales</p>
//           </div>

//           <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
//             <h3 className="font-bold">Rites traditionnels</h3>
//             <p className="text-sm text-gray-600 mt-2">Initiations et funérailles royales</p>
//           </div>

//           <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
//             <h3 className="font-bold">Sagesse orale</h3>
//             <p className="text-sm text-gray-600 mt-2">Proverbes et transmission Ngyemboon</p>
//           </div>

//           <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
//             <h3 className="font-bold">Artisanat</h3>
//             <p className="text-sm text-gray-600 mt-2">Perles, sculpture, costumes royaux</p>
//           </div>

//         </div>
//       </section>

//       {/* ================= RENAISSANCE ================= */}
//       <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-700 text-white">

//         <div className="container mx-auto px-6 text-center">

//           <FaCrown className="text-4xl mx-auto mb-4" />

//           <h2 className="text-3xl font-bold mb-6">
//             Renaissance culturelle
//           </h2>

//           <p className="text-green-100 max-w-3xl mx-auto mb-12">
//             Depuis 2016, Sa Majesté Momo Keubou Serges Evariste a lancé un vaste programme de valorisation culturelle.
//           </p>

//           <div className="grid md:grid-cols-4 gap-6 text-sm">

//             <div className="bg-white/10 p-4 rounded-xl">
//               Reconstruction de la chefferie
//             </div>

//             <div className="bg-white/10 p-4 rounded-xl">
//               Musée des Arts et de la Culture
//             </div>

//             <div className="bg-white/10 p-4 rounded-xl">
//               Festival permanent
//             </div>

//             <div className="bg-white/10 p-4 rounded-xl">
//               Radio Bangang 99.5 FM
//             </div>

//           </div>

//         </div>

//       </section>

//       {/* CTA */}
//       <div className="text-center py-20">
//         <Link
//           href="/news"
//           className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
//         >
//           Suivre l’actualité culturelle
//         </Link>
//       </div>

//     </div>
//   );
// }























































'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { 
  FaLandmark, FaWater, FaMusic, FaUniversity, FaCrown, 
  FaBroadcastTower, FaDrum, FaHands, FaBookOpen, FaPalette,
  FaTree, FaMountain, FaFeather, FaRegSun
} from 'react-icons/fa';
import { GiAfrica, GiDiamondCrown, GiDrum, GiMask } from 'react-icons/gi';
import { FiShield, FiHeart, FiStar, FiGlobe } from 'react-icons/fi';

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

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[9998] opacity-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
        mixBlendMode: 'overlay',
      }}
    />
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function CulturePage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  const sacredSites = [
    {
      title: 'La Chute de Mekoup',
      image: '/mekoup1.jpg',
      description: 'Située à environ 8 km du palais royal, cette chute majestueuse d\'environ 200 mètres de hauteur est l\'un des sites les plus emblématiques de l\'Ouest Cameroun.',
      features: ['Forêt sacrée protégée', 'Lieu de culte et de pèlerinage', 'Sacrifices et bénédictions aux ancêtres']
    },
    {
      title: 'Chutes jumelles de Mepibuea',
      image: '/Mepibwa-Bangang.jpg',
      description: 'Lieu sacré aux vertus spirituelles particulières, symbolisant la dualité et la fertilité.',
      features: ['Site mystique', 'Vertus spirituelles', 'Symbole de dualité']
    }
  ];

  const intangibleHeritage = [
    { icon: FaDrum, title: 'Danses & musiques', description: 'Rythmes ancestraux et cérémonies royales' },
    { icon: FaHands, title: 'Rites traditionnels', description: 'Initiations et funérailles royales' },
    { icon: FaBookOpen, title: 'Sagesse orale', description: 'Proverbes et transmission Ngyemboon' },
    { icon: FaPalette, title: 'Artisanat', description: 'Perles, sculpture, costumes royaux' }
  ];

  const renaissanceProjects = [
    'Reconstruction de la chefferie',
    'Musée des Arts et de la Culture',
    'Festival permanent',
    'Radio Bangang 99.5 FM'
  ];

  return (
    <>
      <GrainOverlay />

      <main className="w-full overflow-x-hidden bg-[#F4F0E8] font-sans">
        {/* ══════════════════════════════════════════════════════
            HERO — SANS OMBRE
        ══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={!isMobile ? { transform: `translateY(${scrollY * 0.15}px)` } : undefined}
          >
            <Image
              src="/mekoup.jpg"
              alt="Chute de Mekoup - Patrimoine culturel Bangang"
              fill
              priority
              className="object-cover object-center brightness-[0.85] saturate-100"
            />
          </div>

          {/* Overlay léger - sans ombre prononcée */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0e] via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
                  Patrimoine culturel & spirituel
                </span>
              </div>

              <h1 className="font-serif text-[clamp(56px,12vw,96px)] font-bold text-[#F5EDD8] leading-[1.05] tracking-[-0.02em] mb-6">
                Culture<br />
                <em className="italic text-[#C9A96E]">Bangang</em>
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-[#C9A96E]/60" />
                <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/60">
                  Un patrimoine vivant, mystique et en pleine renaissance
                </span>
                <div className="w-16 h-px bg-[#C9A96E]/60" />
              </div>

              <p className="font-serif text-[clamp(18px,2.5vw,24px)] italic text-[#F5EDD8]/80 leading-relaxed max-w-3xl mb-10">
                Un patrimoine vivant, mystique et en pleine renaissance culturelle
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#patrimoine"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] hover:gap-4 active:scale-[0.98]"
                >
                  Explorer le patrimoine
                  <span>→</span>
                </Link>
                <Link
                  href="/history"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#C9A96E]/40 text-[#F5EDD8] font-sans text-[12px] font-normal tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E]/80 hover:gap-4 active:scale-[0.98]"
                >
                  Voir l'histoire
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════
            INTRODUCTION
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-5xl mx-auto text-center">
            <FaLandmark className="text-4xl text-[#C9A96E] mx-auto mb-6" />
            <SectionLabel>Introduction</SectionLabel>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed">
              La culture Bangang est riche, spirituelle et profondément ancrée dans les traditions Ngyemboon.
              Elle constitue le socle de l'identité du peuple et se manifeste à travers ses sites sacrés,
              ses rites, ses arts et son organisation sociale.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SITES SACRÉS
        ══════════════════════════════════════════════════════ */}
        <section id="patrimoine" className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FaWater className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Lieux sacrés</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Hauts lieux du patrimoine culturel
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sacredSites.map((site, index) => (
                <div key={index} className="group bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-500">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={site.image}
                      alt={site.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-[#1A1712] mb-3">{site.title}</h3>
                    <p className="font-sans text-[14px] text-[#1A1712]/60 leading-relaxed mb-4">{site.description}</p>
                    <ul className="space-y-2">
                      {site.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-[13px] text-[#1A1712]/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CHEFFERIE ROYALE
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <FaUniversity className="text-4xl text-[#C9A96E] mb-4" />
                <SectionLabel>Chefferie</SectionLabel>
                <h2 className="font-serif text-[clamp(32px,4vw,42px)] font-bold text-[#1A1712] leading-tight mb-4">
                  La Chefferie Royale
                </h2>
                <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed">
                  Cœur spirituel et administratif du groupement, actuellement en reconstruction et modernisation.
                  Symbole de l'autorité traditionnelle et de la pérennité du royaume Bangang.
                </p>
              </div>
              <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Entrée-palais-royal-Bangang.jpg"
                  alt="Chefferie royale Bangang"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 border-2 border-[#C9A96E]/30 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PATRIMOINE IMMATÉRIEL
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FaMusic className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Patrimoine immatériel</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Un héritage vivant
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {intangibleHeritage.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl text-center border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A96E]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#C9A96E]" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#1A1712] mb-2">{item.title}</h3>
                    <p className="font-sans text-[13px] text-[#1A1712]/50">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            RENAISSANCE CULTURELLE
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-[clamp(60px,12vh,100px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0B07] to-[#1A1712]" />
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <FaCrown className="text-4xl text-[#C9A96E] mx-auto mb-4" />
            <SectionLabel light>Renaissance</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#F5EDD8] leading-tight mb-6">
              Renaissance culturelle
            </h2>
            <p className="font-sans text-[16px] text-[#F5EDD8]/60 leading-relaxed max-w-3xl mx-auto mb-12">
              Depuis 2016, Sa Majesté Momo Keubou Serges Evariste a lancé un vaste programme 
              de valorisation culturelle pour préserver et transmettre l'héritage Bangang.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renaissanceProjects.map((project, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-[#C9A96E]/20 hover:border-[#C9A96E]/40 transition-all duration-300">
                  <p className="font-sans text-[14px] text-[#F5EDD8]/80">{project}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E]/10 rounded-full">
              <FaBroadcastTower className="text-[#C9A96E] text-sm" />
              <span className="font-sans text-[12px] text-[#F5EDD8]/70">Radio Bangang 99.5 FM — La voix du royaume</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,80px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8] text-center">
          <div className="max-w-3xl mx-auto">
            <FiHeart className="text-4xl text-[#C9A96E] mx-auto mb-4" />
            <h2 className="font-serif text-[clamp(28px,4vw,38px)] font-bold text-[#1A1712] mb-6">
              Participez à la valorisation<br />
              <em className="italic text-[#C9A96E]">de notre patrimoine culturel</em>
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1712] text-white font-sans text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#2A2620] hover:gap-4 active:scale-[0.98]"
            >
              Suivre l'actualité culturelle
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}