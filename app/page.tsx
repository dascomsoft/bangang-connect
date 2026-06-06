

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { GiCrown, GiAfrica } from 'react-icons/gi';
import { 
  FiUsers, FiMapPin, FiCalendar, FiBriefcase, 
  FiMessageCircle, FiBookOpen, FiStar, FiArrowRight,
  FiHeart, FiClock
} from 'react-icons/fi';
import { FaLandmark, FaUsers, FaTree, FaMountain } from 'react-icons/fa';

// ✅ CORRECTION : Import du vrai SplashScreen au lieu de le redéclarer inline
import SplashScreen from '@/components/splash/SplashScreen';

// Chargement dynamique
const HeritageSection = dynamic(() => import('@/components/sections/HeritageSection'), {
  ssr: false,
  loading: () => <div className="w-full h-[60vh] bg-[#0D0B07] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" /></div>
});

// Données
const STATS = [
  { value: '140', suffix: 'k', label: 'Habitants' },
  { value: '134', suffix: ' km²', label: 'Territoire' },
  { value: '19', label: 'Générations royales' },
  { value: '99.5', suffix: ' FM', label: 'Radio Émergent' },
];

const CARDS = [
  { href: '/history', img: '/bams.jpg', alt: 'Chefferie Bangang', tag: 'Histoire', title: 'Notre Histoire', body: 'Découvrez l\'origine, la fondation par Fouo Patouo et la prestigieuse lignée des rois du royaume Ngyemboon à travers les siècles.', cta: 'Lire l\'histoire' },
  { href: '/culture', img: '/bams1.jpg', alt: 'Culture Bangang', tag: 'Patrimoine', title: 'Culture & Héritage', body: 'La chute de Mekoup, la forêt sacrée, les tenues royales et la renaissance culturelle d\'un royaume vivant.', cta: 'Explorer' },
  { href: '/news', img: '/bams3.jpg', alt: 'Actualités Bangang', tag: 'Actualités', title: 'Chroniques du Royaume', body: 'Reconstruction de la chefferie, musée royal et initiatives communautaires qui façonnent le Bangang d\'aujourd\'hui.', cta: 'Voir les nouvelles' },
];

const PILLARS = [
  { icon: <GiCrown className="text-3xl text-[#C9A96E]" />, title: 'Monarchie Ancestrale', body: 'Institution garante des valeurs, de la cohésion sociale et de la transmission de la mémoire collective du peuple Ngyemboon.' },
  { icon: <FaLandmark className="text-3xl text-[#7BA3A0]" />, title: 'Patrimoine Vivant', body: 'Un héritage constitué de rites, de traditions orales et d\'objets sacrés qui perpétuent l\'âme du royaume.' },
  { icon: <FaUsers className="text-3xl text-[#C9A96E]" />, title: 'Peuple Uni', body: 'Une communauté active qui œuvre à la préservation et au rayonnement du royaume bien au-delà des frontières.' },
];

function GrainOverlay() {
  return <div aria-hidden className="fixed inset-0 pointer-events-none z-[9998] opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', mixBlendMode: 'overlay' }} />;
}

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-8 h-px ${light ? 'bg-[#C9A96E]/70' : 'bg-[#C9A96E]'}`} />
      <span className={`font-sans text-[10px] font-medium tracking-[0.28em] uppercase ${light ? 'text-[#C9A96E]/85' : 'text-[#C9A96E]'}`}>{children}</span>
    </div>
  );
}

export default function HomePage() {
  // Splash à chaque nouvelle session (sessionStorage se remet à zéro à la fermeture de l'onglet)
  const [showSplash, setShowSplash] = useState(false);
  const [splashReady, setSplashReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('splashSeen');
    setShowSplash(!seen);
    setSplashReady(true);
  }, []);

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

  // Attend la lecture du sessionStorage avant de rendre quoi que ce soit
  if (!splashReady) return null;

  if (showSplash) return (
    <SplashScreen
      onComplete={() => {
        sessionStorage.setItem('splashSeen', 'true');
        setShowSplash(false);
      }}
    />
  );

  return (
    <>
      <GrainOverlay />
      <main className="w-full overflow-x-hidden bg-[#F4F0E8] font-sans">
        {/* HERO */}
        <section ref={heroRef} className="relative w-full min-h-screen flex items-end overflow-hidden pb-[clamp(60px,8vh,100px)]">
          <div className="absolute inset-[-10%]" style={!isMobile ? { transform: `translateY(${scrollY * 0.25}px)` } : undefined}>
            <Image src="/roibangang.jpg" alt="Royaume Bangang" fill priority className="object-cover object-[center_30%]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />

          <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-20 pb-10">
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">Royaume des Bamboutos · Fondé par Fouo Patouo</span>
            </div>
            <h1 className="font-serif text-[clamp(48px,10vw,128px)] font-bold leading-[0.9] text-[#F5EDD8] tracking-[-0.02em] mb-4">Bienvenue<br /><em className="italic text-[#C9A96E]">à Bangang</em></h1>
            <div className="flex items-center gap-4 mb-7 mt-2">
              <div className="w-16 h-px bg-[#C9A96E]/60" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/60">Ngyemboon</span>
              <div className="w-16 h-px bg-[#C9A96E]/60" />
            </div>
            <p className="font-serif text-[clamp(16px,2.5vw,28px)] italic text-[#F5EDD8]/70 mb-6 max-w-[540px] leading-relaxed">Un Royaume Atypique en Pleine Renaissance Culturelle</p>
            <p className="font-sans text-[clamp(13px,1.1vw,16px)] font-light text-[#F5EDD8]/55 max-w-[460px] leading-relaxed mb-10 sm:mb-12">Terre d'histoire millénaire et de dynamisme communautaire, sous le leadership de <strong className="text-[#C9A96E]/90 font-medium">S.M. Momo Keubou Serges Evariste</strong>, 19<sup>e</sup> Roi du Royaume Bangang.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/history" className="inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-9 sm:py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] active:scale-[0.98]">Découvrir l'Histoire<span className="text-base">→</span></Link>
              <Link href="/culture" className="inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-9 sm:py-4 bg-transparent border border-[#C9A96E]/40 text-[#F5EDD8] font-sans text-xs sm:text-[13px] font-normal tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E]/80 hover:text-[#C9A96E] active:scale-[0.98]">Explorer la Culture</Link>
            </div>
          </div>
          {!isMobile && (
            <div className="absolute bottom-9 right-12 z-20 flex flex-col items-center gap-2">
              <div className="writing-mode-vertical text-[9px] tracking-[0.25em] uppercase text-[#C9A96E]/45 mb-2">Défiler</div>
              <div className="w-px h-12 bg-[#C9A96E]/20 relative overflow-hidden"><div className="absolute w-full h-2/5 bg-[#C9A96E] animate-[scrollLine_2s_ease-in-out_infinite]" /></div>
            </div>
          )}
        </section>

        {/* STATS */}
        <section className="py-[clamp(48px,8vh,96px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#C9A96E]/25 border border-[#C9A96E]/20">
              {STATS.map((s, i) => (
                <div key={i} className="bg-[#F4F0E8] p-6 sm:p-10 flex flex-col gap-2 transition-colors duration-300 active:bg-[#EDE9DF]">
                  <div className="font-serif text-[clamp(36px,5vw,60px)] font-bold text-[#1A1712] leading-none">{s.value}<span className="text-[0.45em] text-[#C9A96E] ml-0.5 font-normal">{s.suffix}</span></div>
                  <div className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#1A1712]/45 font-normal">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section className="relative bg-[#0D0B07] py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#C9A96E]/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto">
            <SectionLabel light>Héritage Royal</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A96E]/15 mt-10">
              {PILLARS.map((p, i) => (
                <div key={i} className="bg-[#0D0B07] p-8 sm:p-12 flex flex-col gap-5 transition-colors duration-300 active:bg-[#13110B]">
                  <div>{p.icon}</div>
                  <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-[#F5EDD8] leading-tight">{p.title}</h3>
                  <p className="font-sans text-[13px] sm:text-[14px] font-light text-[#F5EDD8]/45 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-14 sm:mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
              <h2 className="font-serif text-[clamp(28px,4.5vw,54px)] font-bold italic text-[#F5EDD8] leading-tight tracking-[-0.01em]">Une Dynastie au Service<br />de la Tradition</h2>
              <p className="font-sans text-[clamp(13px,1.1vw,16px)] font-light text-[#F5EDD8]/45 leading-relaxed flex-1">Bangang est l'une des chefferies majeures des Bamboutos. Son histoire, transmise depuis plusieurs générations, demeure un pilier de l'identité Ngyemboon et un modèle de gouvernance traditionnelle en Afrique centrale.</p>
            </div>
          </div>
        </section>

        {/* À PROPOS */}
        <section className="py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 bg-gradient-to-br from-[#F4F0E8] to-[#EDE9DF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <SectionLabel>À Découvrir</SectionLabel>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-bold text-[#1A1712] leading-tight tracking-[-0.02em]">À propos de <em className="italic text-[#C9A96E]">BangangConnect</em></h2>
              <p className="font-sans text-[clamp(15px,1.2vw,18px)] font-light text-[#1A1712]/55 max-w-3xl mx-auto mt-4 leading-relaxed">La plateforme numérique qui connecte, informe et valorise la communauté Bangang</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]"><Image src="/banganglogo.png" alt="Logo" fill className="object-cover bg-gradient-to-br from-[#1A1712] to-[#2A2620]" /></div>
                <div className="absolute inset-0 border-2 border-[#C9A96E]/30 rounded-2xl pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#C9A96E]/40 rounded-br-2xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-[#C9A96E]/40 rounded-tl-2xl" />
              </div>
              <div>
                <div className="mb-8"><div className="inline-flex items-center gap-2 mb-4"><div className="w-8 h-px bg-[#C9A96E]" /><span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] font-medium">Pourquoi BangangConnect ?</span></div><h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1712] mb-4 leading-tight">Une plateforme <span className="text-[#C9A96E]">communautaire</span> unique</h3></div>
                <div className="space-y-6 text-[#1A1712]/70">
                  <p className="font-sans text-[15px] leading-relaxed"><strong className="text-[#1A1712] font-semibold">BangangConnect</strong> est la première plateforme numérique dédiée exclusivement à la communauté Bangang. Notre mission est de fédérer, d'informer et de promouvoir le patrimoine exceptionnel du royaume.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    {[
                      { icon: <FiBookOpen className="text-2xl text-[#C9A96E]" />, title: 'Actualités', desc: 'Suivez la vie du royaume en temps réel' },
                      { icon: <FiBriefcase className="text-2xl text-[#C9A96E]" />, title: 'Annuaire Économique', desc: 'Valorisez les entrepreneurs Bangang' },
                      { icon: <FiMessageCircle className="text-2xl text-[#C9A96E]" />, title: 'Chat Communautaire', desc: 'Échangez avec votre secteur' },
                      { icon: <FiCalendar className="text-2xl text-[#C9A96E]" />, title: 'Événements', desc: 'Participez à la vie culturelle' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#C9A96E]/10 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">{item.icon}</div>
                        <div><h4 className="font-semibold text-[#1A1712] text-sm">{item.title}</h4><p className="text-xs text-[#1A1712]/50">{item.desc}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-[#C9A96E]/10">
                    <p className="font-sans text-[14px] italic leading-relaxed text-[#C9A96E]/80">« Ensemble, construisons le numérique au service de notre identité et de notre développement. »</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-white font-sans text-[12px] font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] hover:gap-3 active:scale-[0.98]">En savoir plus<FiArrowRight size={14} /></Link>
                      <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 border border-[#C9A96E]/40 text-[#1A1712] font-sans text-[12px] font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E] hover:gap-3 active:scale-[0.98]">Rejoindre<FiArrowRight size={14} /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-[#C9A96E]/10">
              {[
                { icon: <FiUsers className="text-3xl text-[#C9A96E]" />, value: '+2k', label: 'Membres' },
                { icon: <FiMapPin className="text-3xl text-[#C9A96E]" />, value: '+15', label: 'Secteurs' },
                { icon: <FiBriefcase className="text-3xl text-[#C9A96E]" />, value: '+50', label: 'Entreprises' },
                { icon: <FiClock className="text-3xl text-[#C9A96E]" />, value: '24/7', label: 'Support' },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-3 group-hover:bg-[#C9A96E]/20 transition-all duration-300">{item.icon}</div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C9A96E]">{item.value}</div>
                  <div className="font-sans text-[11px] tracking-[0.1em] uppercase text-[#1A1712]/50 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HERITAGE */}
        <HeritageSection />

        {/* EXPLORE CARDS */}
        <section className="bg-[#F4F0E8] py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div><SectionLabel>Explorer</SectionLabel><h2 className="font-serif text-[clamp(32px,5vw,60px)] font-bold text-[#1A1712] leading-tight tracking-[-0.02em]">Plongez dans<br /><em className="italic text-[#6B5A3A]">l'univers Bangang</em></h2></div>
              <Link href="/culture" className="font-sans text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-[#C9A96E] no-underline flex items-center gap-2 pb-0.5 border-b border-[#C9A96E]/40 transition-all duration-300 hover:gap-3">Tout explorer <FiArrowRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CARDS.map((card, i) => (
                <Link key={i} href={card.href} className="no-underline block group">
                  <article className="bg-[#EDE9DF] overflow-hidden h-full transition-all duration-500 active:scale-[0.98]">
                    <div className="relative h-64 sm:h-72 overflow-hidden"><div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><Image src={card.img} alt={card.alt} fill className="object-cover" /></div><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /><div className="absolute top-5 left-5 px-3 py-1.5 bg-black/65 backdrop-blur-md font-sans text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#C9A96E]">{card.tag}</div></div>
                    <div className="p-6 sm:p-7 md:p-8"><h3 className="font-serif text-2xl sm:text-[26px] font-semibold text-[#1A1712] mb-3 leading-tight">{card.title}</h3><p className="font-sans text-[13px] sm:text-[14px] font-light text-[#1A1712]/55 leading-relaxed mb-6">{card.body}</p><div className="flex items-center gap-2 font-sans text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#C9A96E]">{card.cta}<span className="transition-transform duration-300 group-hover:translate-x-1">→</span></div></div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NATURE */}
        <section className="bg-[#1A1712] py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-[clamp(40px,8vw,120px)] items-center">
              <div className="relative w-full lg:w-1/2"><div className="relative h-[320px] sm:h-[420px] lg:h-[580px] overflow-hidden rounded-2xl"><Image src="/montbamboutos.jpeg" alt="Patrimoine naturel Bangang" fill className="object-cover brightness-90 saturate-90" /><div className="absolute -bottom-px -left-px w-16 h-16 border-b border-l border-[#C9A96E]/60" /><div className="absolute -top-px -right-px w-16 h-16 border-t border-r border-[#C9A96E]/60" /></div></div>
              <div className="w-full lg:w-1/2">
                <SectionLabel light>Patrimoine Naturel</SectionLabel>
                <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-bold text-[#F5EDD8] leading-tight tracking-[-0.01em] mb-6">Entre montagnes<br /><em className="italic text-[#C9A96E]">et sites sacrés</em></h2>
                <p className="font-sans text-[14px] sm:text-[15px] font-light text-[#F5EDD8]/50 leading-relaxed mb-10 lg:mb-12">Au cœur des hauts plateaux de l'Ouest Cameroun, Bangang possède un patrimoine naturel remarquable — forêts d'altitude, cascades sacrées et paysages façonnés par des millénaires de présence humaine harmonieuse.</p>
                {[
                  { title: 'Relief des Bamboutos', body: 'Un environnement d\'exception caractéristique des hauts plateaux avec le Mont Bamboutos à 2 740 m.', icon: <FaMountain className="text-[#C9A96E]" /> },
                  { title: 'Forêts & espaces sacrés', body: 'Des lieux de mémoire et de spiritualité préservés depuis des générations de traditions orales.', icon: <FaTree className="text-[#C9A96E]" /> },
                ].map((f, i) => (
                  <div key={i} className={`flex gap-5 ${i === 0 ? 'pb-8 mb-8 border-b border-[#C9A96E]/10' : ''}`}>
                    <div className="w-px bg-[#C9A96E]/50 flex-shrink-0" />
                    <div><div className="flex items-center gap-2 mb-2">{f.icon}<h4 className="font-serif text-lg font-semibold text-[#F5EDD8]">{f.title}</h4></div><p className="font-sans text-[13px] font-light text-[#F5EDD8]/45 leading-relaxed">{f.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="relative min-h-[500px] flex items-center justify-center text-center py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div className="absolute inset-0"><Image src="/roibangang.jpg" alt="" fill className="object-cover brightness-[0.25] saturate-70" aria-hidden /></div>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30" />
          <div className="relative z-10 max-w-3xl px-4">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full"><GiCrown className="text-[#C9A96E] text-sm" /><span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A96E]/80">Vision du Royaume</span></div>
            <h2 className="font-serif text-[clamp(32px,5.5vw,68px)] font-bold text-[#F5EDD8] leading-tight tracking-[-0.015em] mb-5">Une Renaissance Culturelle<br /><em className="text-[#C9A96E] italic">en Marche</em></h2>
            <p className="font-sans text-[14px] sm:text-[15px] font-light text-[#F5EDD8]/50 leading-relaxed mb-10 max-w-2xl mx-auto">Sous l'impulsion des autorités traditionnelles, Bangang poursuit une dynamique de modernisation tout en préservant son identité culturelle millénaire — un modèle unique en Afrique centrale.</p>
            <Link href="/news" className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] hover:gap-4 active:scale-[0.98]">Découvrir les initiatives<FiArrowRight size={14} /></Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30" />
        </section>

        {/* FOOTER CTA */}
        <section className="bg-[#F4F0E8] border-t border-[#C9A96E]/20 py-[clamp(60px,12vh,120px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center text-center lg:text-left">
            <div className="lg:flex-1"><h2 className="font-serif text-[clamp(28px,4.5vw,52px)] font-bold text-[#1A1712] leading-tight tracking-[-0.015em] mb-4">Rejoignez la<br /><em className="italic text-[#6B5A3A]">communauté Bangang</em></h2><p className="font-sans text-[13px] sm:text-[14px] font-light text-[#1A1712]/50 leading-relaxed">Suivez l'actualité du royaume, découvrez son histoire, son patrimoine et participez à sa valorisation internationale.</p></div>
            <div className="lg:flex-1 flex flex-col gap-4 w-full">
              <Link href="/news" className="flex items-center justify-between px-6 py-4 bg-[#1A1712] text-[#F5EDD8] no-underline font-sans text-[11px] sm:text-[12px] tracking-[0.15em] uppercase rounded-xl transition-all duration-300 hover:bg-[#2A2620] hover:px-8 active:scale-[0.98]"><span>Actualités du royaume</span><FiArrowRight className="text-[#C9A96E]" /></Link>
              <Link href="/culture" className="flex items-center justify-between px-6 py-4 bg-transparent border border-[#C9A96E]/30 text-[#1A1712] no-underline font-sans text-[11px] sm:text-[12px] tracking-[0.15em] uppercase rounded-xl transition-all duration-300 hover:border-[#C9A96E]/70 hover:px-8 active:scale-[0.98]"><span>Patrimoine culturel</span><FiArrowRight className="text-[#C9A96E]" /></Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes scrollLine { 0% { top: -50%; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { top: 150%; opacity: 0; } }
        .writing-mode-vertical { writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); }
        .bg-gradient-radial { background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%); }
      `}</style>
    </>
  );
}