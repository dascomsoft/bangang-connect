// 'use client';

// import Image from "next/image";
// import Link from "next/link";
// import Card from "@/components/ui/Card";

// import {
//   FaLandmark,
//   FaCrown,
//   FaMapMarkedAlt,
//   FaUsers,
//   FaRoad,
//   FaMountain,
//   FaGlobeAfrica
// } from "react-icons/fa";

// import { GiVillage, GiAfrica } from "react-icons/gi";

// export default function BangangHistoryPage() {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">

//       {/* ================= HERO ULTRA IMPACT ================= */}
//       <section
//         className="relative h-[90vh] bg-cover bg-center"
//         style={{ backgroundImage: "url('/Entrée-palais-royal-Bangang.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

//         <div className="relative container mx-auto px-6 h-full flex items-center">
//           <div className="text-white max-w-5xl">

//             <div className="flex items-center gap-3 text-green-300 mb-4">
//               <GiAfrica className="text-2xl" />
//               <span className="uppercase tracking-[0.4em] text-sm">
//                 Royaume & Héritage des Grassfields
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-black leading-tight">
//               Histoire du village Bangang
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-3xl">
//               Origine, fondation et dynastie d’un royaume atypique des Grassfields
//             </p>

//             <div className="mt-10 flex gap-4">
//               <Link
//                 href="#histoire"
//                 className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
//               >
//                 Explorer l’histoire
//               </Link>

//               <Link
//                 href="/culture"
//                 className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition"
//               >
//                 Découvrir la culture
//               </Link>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ================= INTRO ================= */}
//       <section id="histoire" className="container mx-auto px-6 py-24 max-w-5xl text-center">

//         <FaLandmark className="text-4xl text-green-600 mx-auto mb-6" />

//         <h2 className="text-3xl font-bold mb-8">
//           Introduction historique
//         </h2>

//         <p className="text-gray-700 leading-relaxed">
//           Situé dans le département des Bamboutos, arrondissement de Batcham,
//           le groupement Bangang est l’un des plus peuplés de la région de l’Ouest du Cameroun
//           (environ <strong>140 000 habitants sur 134 km²</strong>).
//         </p>

//         <p className="text-gray-700 mt-4 leading-relaxed">
//           Il fait partie du grand ensemble Ngyemboon (Ngiemboon), peuple des hautes terres de l’Ouest
//           issu des grandes migrations bantoues venues du Soudan ancien via le Nigeria,
//           avant de s’établir dans les Grassfields au XVIIIe siècle.
//         </p>

//         <p className="text-gray-700 mt-4 leading-relaxed">
//           Bangang se distingue par sa chefferie de premier degré (1977),
//           et par sa tradition monarchique : un royaume guerrier et fédérateur
//           ayant su préserver son identité face à la modernité.
//         </p>

//       </section>

//       {/* ================= TERRITOIRE ================= */}
//       <section className="bg-gray-50 py-24">
//         <div className="container mx-auto px-6 max-w-6xl">

//           <div className="text-center mb-16">
//             <FaMapMarkedAlt className="text-4xl text-green-600 mx-auto mb-4" />
//             <h2 className="text-3xl font-bold">
//               Un territoire stratégique des Monts Bamboutos
//             </h2>
//           </div>

//           <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
//             Bangang s’étend sur le flanc oriental des Monts Bamboutos avec une superficie de 134 km².
//             Sa forme tentaculaire lui donne une frontière d’environ 90 km avec plusieurs groupements
//             répartis entre les régions de l’Ouest et du Sud-Ouest.
//           </p>

//           <div className="grid md:grid-cols-2 gap-6 mt-12">

//             <Card className="p-6">
//               <h3 className="font-bold mb-2">Nord-Ouest</h3>
//               <p className="text-gray-600">
//                 Mbamock (Lebialem) et Fongo-Tongo (Menoua)
//               </p>
//             </Card>

//             <Card className="p-6">
//               <h3 className="font-bold mb-2">Nord</h3>
//               <p className="text-gray-600">
//                 Babadjou, Balatchi, Bamessingue
//               </p>
//             </Card>

//             <Card className="p-6">
//               <h3 className="font-bold mb-2">Est</h3>
//               <p className="text-gray-600">
//                 Mbouda, Bamougong, Batcham
//               </p>
//             </Card>

//             <Card className="p-6">
//               <h3 className="font-bold mb-2">Sud</h3>
//               <p className="text-gray-600">
//                 Balessing, Baleveng, Bafou
//               </p>
//             </Card>

//           </div>

//         </div>
//       </section>

//       {/* ================= POPULATION ================= */}
//       <section className="container mx-auto px-6 py-24 max-w-5xl">

//         <FaUsers className="text-4xl text-green-600 mx-auto mb-6" />

//         <h2 className="text-3xl font-bold text-center mb-8">
//           Population & Dynamique sociale
//         </h2>

//         <p className="text-gray-700 leading-relaxed text-center">
//           La population de Bangang est estimée à environ <strong>140 000 habitants</strong>,
//           avec une densité dépassant <strong>1 000 habitants/km²</strong>.
//         </p>

//         <p className="text-gray-700 mt-4 text-center">
//           Forte pression démographique entraînant migrations saisonnières et déplacements
//           vers les zones agricoles et les grandes villes comme Douala, Yaoundé, Bafoussam,
//           Bamenda et le Moungo.
//         </p>

//       </section>

//       {/* ================= FONDATION ================= */}
//       <section className="bg-gray-50 py-24">

//         <div className="container mx-auto px-6 max-w-5xl text-center">

//           <GiVillage className="text-4xl text-green-600 mx-auto mb-6" />

//           <h2 className="text-3xl font-bold mb-8">
//             Fondation et dynastie royale
//           </h2>

//           <p className="text-gray-700 leading-relaxed">
//             La chefferie Bangang naît sous Fouo Patouo, premier roi.
//             Après des migrations (Mola, Balena, Batcham), le siège est définitivement établi.
//           </p>

//           <p className="text-gray-700 mt-4">
//             Le territoire est structuré en villages fondateurs :
//             Bamboue, Bantsiet, Bamessa, Mekoup, Mepibuea…
//           </p>

//         </div>

//       </section>

//       {/* ================= DYNASTIE ================= */}
//       <section className="container mx-auto px-6 py-24">

//         <FaCrown className="text-4xl text-yellow-500 mx-auto mb-6" />

//         <h2 className="text-3xl font-bold text-center mb-10">
//           Dynastie des 19 rois
//         </h2>

//         <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

//           <Card className="p-6">
//             <h3 className="font-bold">Ngung Ndjay</h3>
//             <p>Premier roi élu à Nzie Nzye</p>
//           </Card>

//           <Card className="p-6">
//             <h3 className="font-bold">Rois intermédiaires</h3>
//             <p>Fouo Lemouo, Zogning, Tetangou, Mbou’pouo, etc.</p>
//           </Card>

//           <Card className="p-6">
//             <h3 className="font-bold">Fouo Effenzi Pierre</h3>
//             <p>Règne historique et figure emblématique</p>
//           </Card>

//           <Card className="p-6">
//             <h3 className="font-bold">Dynastie moderne</h3>
//             <p>
//               Momo Jean Norbert<br />
//               Momo Joseph (1975–2016)<br />
//               S.M. Momo Keubou Serges Evariste (depuis 2016)
//             </p>
//           </Card>

//         </div>

//       </section>

//       {/* ================= HERITAGE ================= */}
//       <section className="bg-gray-900 text-white py-24 text-center">

//         <h2 className="text-3xl font-bold mb-6">
//           Héritage et singularité
//         </h2>

//         <p className="max-w-4xl mx-auto text-gray-300 leading-relaxed">
//           Bangang incarne un modèle de royauté africaine moderne :
//           autorité traditionnelle forte, conseil structuré des 9, notables et dignitaires,
//           avec une ouverture vers l’éducation, le développement et la diaspora.
//         </p>

//       </section>

//     </div>
//   );
// }






















































































































'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { 
  FaLandmark, FaCrown, FaMapMarkedAlt, FaUsers, 
  FaRoad, FaMountain, FaGlobeAfrica, FaRegClock,
  FaTree, FaWater, FaHandsHelping, FaRegBuilding
} from 'react-icons/fa';
import { GiVillage, GiAfrica, GiCrown, GiKing } from 'react-icons/gi';
import { FiMapPin, FiCalendar, FiBookOpen, FiUsers, FiShield } from 'react-icons/fi';

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
export default function BangangHistoryPage() {
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

  const kings = [
    'Ngung Ndjay',
    'Fouo Lemouo',
    'Zogning',
    'Tetangou',
    'Mbou\'pouo',
    'Fouo Effenzi Pierre',
    'Momo Jean Norbert',
    'Momo Joseph (1975–2016)',
    'S.M. Momo Keubou Serges Evariste (depuis 2016)'
  ];

  const neighboringVillages = [
    { direction: 'Nord-Ouest', villages: 'Mbamock (Lebialem), Fongo-Tongo (Menoua)' },
    { direction: 'Nord', villages: 'Babadjou, Balatchi, Bamessingue' },
    { direction: 'Est', villages: 'Mbouda, Bamougong, Batcham' },
    { direction: 'Sud', villages: 'Balessing, Baleveng, Bafou' }
  ];

  const foundingVillages = [
    'Bamboue', 'Bantsiet', 'Bamessa', 'Mekoup', 'Mepibuea'
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
          {/* Image sans ombre */}
          <div
            className="absolute inset-0"
            style={!isMobile ? { transform: `translateY(${scrollY * 0.15}px)` } : undefined}
          >
            <Image
              src="/Entrée-palais-royal-Bangang.jpg"
              alt="Entrée du palais royal de Bangang"
              fill
              priority
              className="object-cover object-center brightness-[0.85] saturate-100"
            />
          </div>

          {/* Overlay léger - sans ombre prononcée */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
                  Royaume & Héritage des Grassfields
                </span>
              </div>

              <h1 className="font-serif text-[clamp(56px,12vw,96px)] font-bold text-[#F5EDD8] leading-[1.05] tracking-[-0.02em] mb-6">
                Histoire du village<br />
                <em className="italic text-[#C9A96E]">Bangang</em>
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-[#C9A96E]/60" />
                <span className="font-extrabold text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/9npm 0">
                  Origine, fondation et dynastie
                </span>
                <div className="w-16 h-px bg-[#C9A96E]/60" />
              </div>

              <p className="font-serif text-[clamp(18px,2.5vw,24px)] italic text-[#F5EDD8]/80 leading-relaxed max-w-3xl mb-10">
                Un royaume atypique des Grassfields, entre tradition et modernité
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#histoire"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] hover:gap-4 active:scale-[0.98]"
                >
                  Explorer l'histoire
                  <span>→</span>
                </Link>
                <Link
                  href="/culture"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#C9A96E]/40 text-[#F5EDD8] font-sans text-[12px] font-normal tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E]/80 hover:gap-4 active:scale-[0.98]"
                >
                  Découvrir la culture
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            INTRODUCTION
        ══════════════════════════════════════════════════════ */}
        <section id="histoire" className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-5xl mx-auto text-center">
            <FaLandmark className="text-4xl text-[#C9A96E] mx-auto mb-6" />
            <SectionLabel>Origines</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight mb-8">
              Introduction historique
            </h2>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
              Situé dans le département des Bamboutos, arrondissement de Batcham,
              le groupement Bangang est l'un des plus peuplés de la région de l'Ouest du Cameroun
              (environ <strong className="text-[#C9A96E]">140 000 habitants sur 134 km²</strong>).
            </p>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
              Il fait partie du grand ensemble Ngyemboon (Ngiemboon), peuple des hautes terres de l'Ouest
              issu des grandes migrations bantoues venues du Soudan ancien via le Nigeria,
              avant de s'établir dans les Grassfields au XVIIIe siècle.
            </p>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed">
              Bangang se distingue par sa chefferie de premier degré (1977),
              et par sa tradition monarchique : un royaume guerrier et fédérateur
              ayant su préserver son identité face à la modernité.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TERRITOIRE
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FiMapPin className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Géographie</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Un territoire stratégique des Monts Bamboutos
              </h2>
            </div>

            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed text-center max-w-4xl mx-auto mb-12">
              Bangang s'étend sur le flanc oriental des Monts Bamboutos avec une superficie de 134 km².
              Sa forme tentaculaire lui donne une frontière d'environ 90 km avec plusieurs groupements
              répartis entre les régions de l'Ouest et du Sud-Ouest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {neighboringVillages.map((item, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#C9A96E]/10">
                  <div className="font-serif text-lg font-semibold text-[#C9A96E] mb-2">{item.direction}</div>
                  <p className="font-sans text-[13px] text-[#1A1712]/60">{item.villages}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            POPULATION
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-5xl mx-auto text-center">
            <FiUsers className="text-4xl text-[#C9A96E] mx-auto mb-6" />
            <SectionLabel>Démographie</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight mb-8">
              Population & Dynamique sociale
            </h2>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
              La population de Bangang est estimée à environ <strong className="text-[#C9A96E]">140 000 habitants</strong>,
              avec une densité dépassant <strong className="text-[#C9A96E]">1 000 habitants/km²</strong>.
            </p>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed">
              Forte pression démographique entraînant migrations saisonnières et déplacements
              vers les zones agricoles et les grandes villes comme Douala, Yaoundé, Bafoussam,
              Bamenda et le Moungo.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FONDATION
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-5xl mx-auto text-center">
            <GiKing className="text-4xl text-[#C9A96E] mx-auto mb-6" />
            <SectionLabel>Fondation</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight mb-8">
              Fondation et dynastie royale
            </h2>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-6">
              La chefferie Bangang naît sous <strong className="text-[#C9A96E]">Fouo Patouo</strong>, premier roi.
              Après des migrations (Mola, Balena, Batcham), le siège est définitivement établi.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {foundingVillages.map((village, i) => (
                <span key={i} className="px-4 py-2 bg-white/60 rounded-full text-[13px] text-[#1A1712]/70 border border-[#C9A96E]/20">
                  {village}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            DYNASTIE
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#0D0B07] py-[clamp(60px,12vh,120px)] px-5 sm:px-8 lg:px-20 relative overflow-hidden">
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#C9A96E]/5 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <GiCrown className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel light>Dynastie</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#F5EDD8] leading-tight">
                Dynastie des 19 rois
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kings.map((king, i) => (
                <div key={i} className="bg-[#0D0B07] p-4 rounded-xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
                      <span className="text-[#C9A96E] text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="font-sans text-[14px] text-[#F5EDD8]/80">{king}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="font-serif text-lg italic text-[#F5EDD8]/50">
                Une lignée de 19 souverains ayant marqué l'histoire du royaume
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HÉRITAGE
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-[clamp(60px,12vh,100px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/roibangang.jpg"
              alt="Héritage Bangang"
              fill
              className="object-cover brightness-[0.25] saturate-70"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C9A96E]/60 mb-6">
              ◈ &nbsp; Patrimoine &nbsp; ◈
            </div>

            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-bold text-[#F5EDD8] leading-tight mb-6">
              Héritage et singularité
            </h2>

            <p className="font-sans text-[16px] text-[#F5EDD8]/60 leading-relaxed max-w-3xl mx-auto">
              Bangang incarne un modèle de royauté africaine moderne :
              autorité traditionnelle forte, conseil structuré des 9, notables et dignitaires,
              avec une ouverture vers l'éducation, le développement et la diaspora.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm">
                <FiShield className="text-[#C9A96E]" />
                <span className="text-sm text-white/80">Autorité traditionnelle</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm">
                <FiUsers className="text-[#C9A96E]" />
                <span className="text-sm text-white/80">Conseil des 9</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm">
                <FaGlobeAfrica className="text-[#C9A96E]" />
                <span className="text-sm text-white/80">Diaspora active</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
        }
      `}</style>
    </>
  );
}