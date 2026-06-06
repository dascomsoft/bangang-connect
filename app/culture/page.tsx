'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { 
  FaLandmark, FaWater, FaMusic, FaUniversity, FaCrown, 
  FaBroadcastTower, FaDrum, FaHands, FaBookOpen, FaPalette,
  FaTree, FaMountain, FaFeather, FaRegSun, FaMicrophone,
  FaCalendarAlt, FaBuilding, FaHandSpock,
  FaPrayingHands, FaHeart, FaGlobe
} from 'react-icons/fa';
import { GiAfrica, GiDrum, GiStoneBridge, GiArchiveResearch } from 'react-icons/gi';
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
      features: ['Forêt sacrée protégée', 'Lieu de culte et de pèlerinage', 'Eau aux vertus curatives', 'Sacrifices et bénédictions aux ancêtres', 'Symbole de fécondité']
    },
    {
      title: 'Chutes jumelles de Mepibuea',
      image: '/Mepibwa-Bangang.jpg',
      description: 'Lieu sacré aux vertus spirituelles particulières, symbolisant la dualité et la fertilité du peuple Ngyemboon.',
      features: ['Site mystique', 'Vertus spirituelles', 'Symbole de dualité', 'Rites ancestraux']
    }
  ];

  const intangibleHeritage = [
    { icon: FaDrum, title: 'Danses & musiques', description: 'Rythmes ancestraux et cérémonies royales' },
    { icon: FaHands, title: 'Rites traditionnels', description: 'Initiations et funérailles royales' },
    { icon: FaBookOpen, title: 'Sagesse orale', description: 'Proverbes et transmission Ngyemboon' },
    { icon: FaPalette, title: 'Artisanat', description: 'Perles, sculpture, costumes royaux' }
  ];

  const renaissanceProjects = [
    { title: 'Reconstruction de la chefferie', description: 'Plan d\'aménagement futuriste avec l\'expertise de "La route des chefferies"', icon: FaCrown },
    { title: 'Musée des Arts et de la Culture', description: 'Sauvegarde et mise en valeur du patrimoine traditionnel Bangang', icon: GiArchiveResearch },
    { title: 'Festival culturel international', description: 'Festival digne des grands festivals camerounais (Medumba, Ngondo, Ngouon)', icon: FaCalendarAlt },
    { title: 'Radio Bangang Émergent', description: '99.5 FM — La voix du royaume, bientôt disponible sur Internet', icon: FaBroadcastTower }
  ];

  const legendaryPlaces = [
    {
      title: 'Le Pont Tourmla',
      icon: GiStoneBridge,
      description: 'Pont constitué de nervures bien tissées, symbole de vérité. Infranchissable pour les "hommes compliqués".',
      details: ['Construit par les notables des neuf et des sept', 'Symbole de vérité et de pureté', "Ne se traverse pas par peur ou par honte"]
    },
    {
      title: 'La Forêt Sacrée de Nzye',
      icon: FaTree,
      description: 'Forêt sacrée à traverser avant d\'arriver sur les terres Bangang.',
      details: ['Lieu mystique protégé', 'Porte d\'entrée du territoire Ngyemboon']
    },
    {
      title: 'Le Marché Yinnézo',
      icon: FaHandSpock,
      description: 'Marché ancestral créé par les ancêtres Nguemboon pour favoriser les échanges.',
      details: ['Lieu d\'échange sacré', '"Personne ne pouvait prendre la chose d\'autrui"']
    }
  ];

  return (
    <>
      <GrainOverlay />

      <main className="w-full overflow-x-hidden bg-[#F4F0E8] font-sans">
        {/* ══════════════════════════════════════════════════════
            HERO
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
              src="/dansepic1.jpg"
              alt="Chute de Mekoup - Patrimoine culturel Bangang"
              fill
              priority
              className="object-cover object-center brightness-[0.85] saturate-100"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0e] via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
                  Les Nguemboon : il était une fois !
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
                "Les hommes compliqués ne traversent jamais ce pont. Ne le fais pas par peur ou par honte, ou par féturèse ; ce pont est un symbole de vérité."<br />
                <span className="text-sm not-italic text-[#C9A96E]/60">— NDE Tassongia, gardien du Pont Tourmla</span>
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
                  Découvrir l'histoire Ngyemboon
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════
            INTRODUCTION — L'ÉPOPÉE NGUEMBOON
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-5xl mx-auto text-center">
            <GiAfrica className="text-4xl text-[#C9A96E] mx-auto mb-6" />
            <SectionLabel>L'épopée Nguemboon</SectionLabel>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-6">
              Nguemboon s'est arrêté en ces lieux. Il symbolise la fédération de ce grand peuple. 
              La culture Bangang est riche, spirituelle et profondément ancrée dans les traditions Ngyemboon.
              Elle constitue le socle de l'identité du peuple et se manifeste à travers ses sites sacrés,
              ses rites, ses arts et son organisation sociale.
            </p>
            <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed">
              C'est à partir de la zone où les Bangang ont occupé cette zone qu'il faut traverser 
              la forêt sacrée de Nzye pour découvrir tout un univers de mystères et de traditions séculaires.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SITES SACRÉS — CHUTES ET FORÊTS
        ══════════════════════════════════════════════════════ */}
        <section id="patrimoine" className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FaWater className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Lieux sacrés</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                La Chute de Mekoup et sa forêt sacrée
              </h2>
            </div>

            <div className="mb-16 bg-white/40 rounded-2xl p-8 border border-[#C9A96E]/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1712] mb-3">Un lieu culte ancestral</h3>
                  <p className="font-sans text-[15px] text-[#1A1712]/70 leading-relaxed mb-4">
                    Avant d'arriver à Mekoup, il faut escalader les rochers qui sont éparpillés après la traversée 
                    de la forêt sacrée. Tout au bord de la chute, un paysage unique à son genre s'offre à vous, 
                    une véritable merveille de la nature.
                  </p>
                  <p className="font-sans text-[15px] text-[#1A1712]/70 leading-relaxed mb-4">
                    D'une hauteur de 200 mètres environ, la chute de Mekoup arrose tous les villages Ngyemboon. 
                    Les populations y viennent pour demander des bénédictions, pour faire des sacrifices 
                    et pour faire des offrandes aux dieux de cette chute.
                  </p>
                  <div className="bg-[#C9A96E]/10 p-4 rounded-xl mt-4">
                    <p className="font-serif italic text-[14px] text-[#1A1712]/80">
                      "L'eau de cette chute a d'énormes vertus ; elle soigne de nombreuses maladies et surtout, 
                      elle apporte une véritable paix intérieure. La chute de Mekoup et sa forêt sacrée 
                      symbolisent la fécondité du peuple Ngyemboon, son eau arrose tous ses villages."
                    </p>
                    <p className="text-right text-[12px] text-[#C9A96E] mt-2">— Ngundo Bernard, guide spirituel</p>
                  </div>
                </div>
                <div className="relative h-80 lg:h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src="/mekoup1.jpg"
                    alt="Chute de Mekoup"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/30 rounded-lg">
                <p className="font-sans text-[13px] text-[#1A1712]/60">
                  <strong className="text-[#C9A96E]">Information historique :</strong> Selon les historiens, 
                  la chute de Mekoup existe depuis le 16ème siècle. L'éboulement de ses rochers est dû à un 
                  phénomène surnaturel. Pour visiter cet endroit unique au monde, il faut se vêtir d'une tenue 
                  de sport et surtout savoir qu'on rentre toujours de Mekoup, gavé de plus de bénédictions.
                </p>
              </div>
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
            LÉGENDES ET SYMBOLES — PONT TOURMLA
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <GiStoneBridge className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Légendes & Symboles</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Le mystérieux pont Tourmla
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {legendaryPlaces.map((place, index) => {
                const Icon = place.icon;
                return (
                  <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A96E]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#C9A96E]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1712] mb-3 text-center">{place.title}</h3>
                    <p className="font-sans text-[14px] text-[#1A1712]/60 leading-relaxed mb-4 text-center">
                      {place.description}
                    </p>
                    <ul className="space-y-2">
                      {place.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-[12px] text-[#1A1712]/50">
                          <FiStar className="w-3 h-3 text-[#C9A96E]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="font-sans text-[14px] text-[#1A1712]/50 italic">
                Extrait de l'ouvrage « Bangang comment on en est arrivé là » — Synthèse de La&apos;akam Actu Magazine
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CHEFFERIE ROYALE — PROJET DE RECONSTRUCTION
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <FaUniversity className="text-4xl text-[#C9A96E] mb-4" />
                <SectionLabel>Chefferie Royale</SectionLabel>
                <h2 className="font-serif text-[clamp(32px,4vw,42px)] font-bold text-[#1A1712] leading-tight mb-4">
                  La Chefferie Supérieure
                </h2>
                <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
                  À travers les différentes règnes, la chefferie supérieure a toujours fait l'objet d'une 
                  attention particulière de la part de ses occupants et des fils et filles Bangang.
                </p>
                <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
                  Le palais royal a été plusieurs fois rénové mais S.M. Momo Keubou souhaite marquer son règne 
                  avec un véritable plan d'aménagement général et futuriste de la chefferie. Ce projet a reçu 
                  un accueil très favorable de la part de ses populations.
                </p>
                <div className="bg-white/50 p-4 rounded-xl mt-4">
                  <p className="font-sans text-[14px] text-[#1A1712]/70">
                    <strong className="text-[#C9A96E]">À savoir :</strong> Une Commission est à pied d'œuvre à cet effet. 
                    Le programme « La route des chefferies » a été également sollicité pour son expertise. 
                    La récente tournée du Roi Momo Keubou en Europe (juillet et août 2022) visait entre autres 
                    la recherche des voies et moyens pour ce projet ambitieux.
                  </p>
                </div>
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
            MUSÉE DES ARTS ET DE LA CULTURE
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/BamilekeMaskThumb.jpg"
                  alt="Musée du Quai Branly - Exposition Bangang"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 border-2 border-[#C9A96E]/30 rounded-2xl pointer-events-none" />
              </div>
              <div className="order-1 lg:order-2">
                <GiArchiveResearch className="text-4xl text-[#C9A96E] mb-4" />
                <SectionLabel>Projet culturel majeur</SectionLabel>
                <h2 className="font-serif text-[clamp(32px,4vw,42px)] font-bold text-[#1A1712] leading-tight mb-4">
                  Musée des Arts<br />et de la Culture Bangang
                </h2>
                <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
                  Ce projet vise la sauvegarde et la mise en valeur du patrimoine traditionnel et culturel 
                  des Bangang et par extension du peuple Ngyemboon.
                </p>
                <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed">
                  Dans une démarche collective, le Roi Bangang a visité, aux côtés d'autres autorités 
                  traditionnelles du Cameroun, l'expédition « Sur la route des chefferies du Cameroun : 
                  du visible à l'invisible » organisée du 05 avril au 17 juillet 2022, au musée du Quai Branly 
                  Jacques Chirac en France. Des objets de l'Art Bangang d'une valeur exceptionnelle y ont été exposés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FESTIVAL CULTUREL
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FaCalendarAlt className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Événement majeur</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Un festival culturel d&apos;envergure
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed text-center mb-8">
                Depuis son arrivée au trône, le Roi Bangang est engagé à faire de Bangang une grande destination 
                touristique aux yeux du monde entier. Il ambitionne d&apos;organiser un festival à l&apos;image des 
                grands festivals du Cameroun que sont le festival Medumba (Peuple Bamileké), le festival du Ngondo 
                (Peuple Sawa), le festival du Ngouon (peuple Bamoum), le festival NyemNyem, ou encore le festival 
                Mayi (peuple Batanga).
              </p>
              <div className="bg-white/50 p-6 rounded-xl">
                <p className="font-sans text-[15px] text-[#1A1712]/80 leading-relaxed">
                  Il ne s&apos;agit donc pas d&apos;une simple foire culturelle mais d&apos;une véritable organisation 
                  à inscrire dans les annales du Ministère du tourisme et celui des Arts et de la Culture. 
                  Un comité d&apos;organisation est sur pied, ses membres se rendent régulièrement auprès des 
                  membres des comités d&apos;organisation d&apos;autres festivals pour apprendre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PATRIMOINE IMMATÉRIEL
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
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
            RADIO BANGANG ÉMERGENT
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <FaMicrophone className="text-4xl text-[#C9A96E] mb-4" />
                <SectionLabel>Média communautaire</SectionLabel>
                <h2 className="font-serif text-[clamp(32px,4vw,42px)] font-bold text-[#1A1712] leading-tight mb-4">
                  Radio Bangang Émergent<br />
                  <span className="text-2xl">99.5 FM</span>
                </h2>
                <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
                  La Radio Bangang Émergent (RBE, 99,5 FM) est sur les ondes depuis le 01/06/2020. 
                  C&apos;est une radio communautaire de proximité, mise sur pied avec l&apos;appui de la fondation 
                  Bangang Émergent.
                </p>
                <p className="font-sans text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
                  Un personnel dynamique s&apos;y déploie avec des programmes très diversifiés pour rehausser 
                  l&apos;image du groupement. Un accent particulier est mis sur la valorisation des us et coutumes 
                  du peuple Ngyemboon.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E]/20 rounded-full">
                  <FaGlobe className="text-[#C9A96E] text-sm" />
                  <span className="font-sans text-[12px] text-[#1A1712]/70">Bientôt disponible sur Internet</span>
                </div>
              </div>
              <div className="relative h-80 lg:h-[350px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#C9A96E]/20 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <FaBroadcastTower className="text-6xl text-[#C9A96E] mx-auto mb-4" />
                  <p className="font-serif text-xl text-[#1A1712]">99.5 FM</p>
                  <p className="font-sans text-sm text-[#1A1712]/50">La voix du royaume</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            RENAISSANCE CULTURELLE — L'ACTION DU ROI
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-[clamp(60px,12vh,100px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0B07] to-[#1A1712]" />
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <FaCrown className="text-4xl text-[#C9A96E] mx-auto mb-4" />
            <SectionLabel light>Renaissance</SectionLabel>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#F5EDD8] leading-tight mb-6">
              Renaissance culturelle
            </h2>
            <p className="font-sans text-[16px] text-[#F5EDD8]/60 leading-relaxed max-w-3xl mx-auto mb-8">
              En principe, les 06 dernières années du Roi des Bangang n&apos;ont pas été de tout repos. 
              Il s&apos;est très vite détaché de la paresse que l&apos;on observe chez certains jeunes rois 
              qui dès leur arrivée au trône, se lancent d&apos;abord dans les festivités avant de penser 
              au développement de leur chefferie.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {renaissanceProjects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-[#C9A96E]/20 hover:border-[#C9A96E]/40 transition-all duration-300 text-left">
                    <Icon className="text-[#C9A96E] text-2xl mb-3" />
                    <h3 className="font-serif text-lg font-semibold text-[#F5EDD8] mb-2">{project.title}</h3>
                    <p className="font-sans text-[13px] text-[#F5EDD8]/50">{project.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,80px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8] text-center">
          <div className="max-w-3xl mx-auto">
            <FaHeart className="text-4xl text-[#C9A96E] mx-auto mb-4" />
            <h2 className="font-serif text-[clamp(28px,4vw,38px)] font-bold text-[#1A1712] mb-6">
              Participez à la valorisation<br />
              <em className="italic text-[#C9A96E]">de notre patrimoine culturel</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1712] text-white font-sans text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#2A2620] hover:gap-4 active:scale-[0.98]"
              >
                Suivre l'actualité culturelle
                <span>→</span>
              </Link>
              <Link
                href="/radio"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1A1712]/20 text-[#1A1712] font-sans text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 hover:gap-4"
              >
                Écouter Radio Bangang
                <FaMicrophone className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}