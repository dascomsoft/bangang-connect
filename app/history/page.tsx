'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { 
  FaLandmark, FaGlobeAfrica, FaMountain
} from 'react-icons/fa';
import { GiCrown, GiKing } from 'react-icons/gi';
import { FiMapPin, FiUsers, FiShield, FiArrowRight } from 'react-icons/fi';

// ─── Composants ──────────────────────────────────────────────

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4 sm:mb-5">
      <div className={`w-6 sm:w-8 h-px ${light ? 'bg-[#C9A96E]/70' : 'bg-[#C9A96E]'}`} />
      <span className={`font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.24em] sm:tracking-[0.28em] uppercase ${light ? 'text-[#C9A96E]/85' : 'text-[#C9A96E]'}`}>
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

// ─── Données complètes ───────────────────────────────────────

const KINGS = [
  {
    num: 1,
    name: 'Ngang Ndjay',
    subtitle: 'Ngung Ndjay',
    note: 'Premier roi élu par le peuple à Nzie Nzye — fondateur de la lignée royale',
    era: 'XVIIIe siècle',
    current: false,
  },
  {
    num: 2,
    name: 'Fouo Lemouo',
    subtitle: 'Fuò le Muo',
    note: '',
    era: '',
    current: false,
  },
  {
    num: 3,
    name: 'Fouo Zogning',
    subtitle: 'Fuò Zoo nyij',
    note: '',
    era: '',
    current: false,
  },
  {
    num: 4,
    name: 'Fouo Tetangou',
    subtitle: 'Fuò Te taa Ngù',
    note: '',
    era: '',
    current: false,
  },
  {
    num: 5,
    name: "Fouo Mbou'pouo",
    subtitle: "Fuò Mbù' pùo",
    note: '',
    era: '',
    current: false,
  },
  {
    num: 6,
    name: 'Fouo Melyontcheu',
    subtitle: 'Fuò Meli Lyo Ncwo',
    note: '',
    era: '',
    current: false,
  },
  {
    num: 7,
    name: 'Fouo Tso Tamao',
    subtitle: "Fuò Tsò' taa ma'",
    note: '',
    era: '',
    current: false,
  },
  {
    num: 8,
    name: 'Fouo Tagangdio',
    subtitle: "Fuò ta gəən ndyà'",
    note: '',
    era: '',
    current: false,
  },
  {
    num: 9,
    name: 'Fouo Kelemezemda',
    subtitle: 'Fuò Kelemezemda',
    note: 'Transféra le palais de Nzie Nzye à son emplacement actuel. Fin polygame, réputé pour sa sagesse.',
    era: '',
    current: false,
  },
  {
    num: 10,
    name: 'Fouo Yonta',
    subtitle: 'Fuò Yəən',
    note: '',
    era: '',
    current: false,
  },
  {
    num: 11,
    name: "Fouo Tsa'asse",
    subtitle: "Fuò Tsa'à Ssé",
    note: 'Père de Mouotoh Tiwa, 1er chef Bamougong',
    era: '',
    current: false,
  },
  {
    num: 12,
    name: 'Fouo Meli',
    subtitle: 'Fuò Meli',
    note: 'Mourut sans enfant — céda le trône à son frère Tadounyempie',
    era: '',
    current: false,
  },
  {
    num: 13,
    name: 'Fouo Tadounyempie',
    subtitle: 'Fuò Ta nduj gie mbyé',
    note: 'Attribua le nom Meli à son successeur',
    era: '',
    current: false,
  },
  {
    num: 14,
    name: 'Fouo Meli 2',
    subtitle: 'Fuò Meli 2',
    note: '',
    era: '',
    current: false,
  },
  {
    num: 15,
    name: 'Fouo Tanemo',
    subtitle: 'Fuò Tàne Mòon',
    note: "Porta secours au roi Tamlepong à l'arrivée des Allemands. Blessé d'une balle au talon, il réunit son peuple pour prononcer un serment solennel.",
    era: 'Ère coloniale',
    current: false,
  },
  {
    num: 16,
    name: 'S.M. Efenzi Pierre',
    subtitle: "Fuò Swié' Nze",
    note: "Long règne de plus de 70 ans. Pacificateur des Allemands avec les rois de la Menoua et des Bamboutos. Baptisé sur son lit de mort — surnommé « Holly Pierre ». Roi David du peuple Bangang. Décédé en 1957.",
    era: '1957',
    current: false,
    img: '',
  },
  {
    num: 17,
    name: 'Momo Jean Norbert',
    subtitle: "Fuò Mə'Muo Jean Norbert",
    note: "Accéda au trône à la veille des troubles d'indépendance du Cameroun. Règne de 18 ans dans une période difficile pour tous les Ngyemboon.",
    era: '1957 – 1975',
    current: false,
    img: '',
  },
  {
    num: 18,
    name: 'S.M. Momo Joseph',
    subtitle: "Fuò Mə'Muo Joseph",
    note: '41 ans de règne. Période de consolidation du royaume.',
    era: '1975 – 2016',
    current: false,
    img: '',
  },
  {
    num: 19,
    name: 'S.M. Momo Keubou Serges Evariste',
    subtitle: "Fuò Mə'Muo Nku Mbù' Serges Evariste",
    note: 'Actuel roi du Royaume Bangang depuis le 31 mars 2016. Sous son règne, le royaume entre dans une dynamique de renaissance culturelle et de modernisation numérique.',
    era: 'Depuis le 31 mars 2016',
    current: true,
    img: '/roibangang.jpg',
  },
];

const NEIGHBORS = [
  { direction: 'Nord-Ouest', icon: '↖', villages: 'Mbamock (Lebialem, Sud-Ouest), Fongo-Tongo (Menoua, Ouest)' },
  { direction: 'Nord', icon: '↑', villages: 'Babadjou, Balatchi, Bamessingue (Bamboutos)' },
  { direction: 'Est', icon: '→', villages: 'Ville de Mbouda, Bamougong, Batcham (Bamboutos)' },
  { direction: 'Sud-Est', icon: '↘', villages: 'Balessing (Menoua)' },
  { direction: 'Sud-Ouest', icon: '↙', villages: 'Baleveng, Bafou (Menoua)' },
];

const FOUNDING_VILLAGES = ['Bamboue', 'Bantsiet', 'Bamessa', 'Mekoup', 'Mepibuea'];

const KEY_DATES = [
  { year: 'XVIIIe s.', label: 'Fondation', desc: 'Fouo Patouo installe définitivement la chefferie après plusieurs migrations' },
  { year: '1957', label: 'Fin règne Efenzi', desc: 'Décès de S.M. Efenzi Pierre après 70 ans de règne pacificateur' },
  { year: '1968', label: 'Levée du serment', desc: 'Pasteurs, notables et prêtres conjurent le parjure de Fouo Tanemo' },
  { year: '1977', label: 'Chefferie 1er degré', desc: 'Bangang officiellement reconnue comme chefferie de premier degré' },
  { year: '2016', label: 'Nouveau roi', desc: 'Intronisation de S.M. Momo Keubou Serges Evariste le 31 mars 2016' },
];

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

  return (
    <>
      <GrainOverlay />
      <main className="w-full overflow-x-hidden bg-[#F4F0E8] font-sans">

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={!isMobile ? { transform: `translateY(${scrollY * 0.15}px)` } : undefined}
          >
            <Image
              src="/Entrée-palais-royal-Bangang.jpg"
              alt="Entrée du palais royal de Bangang"
              fill priority
              className="object-cover object-center brightness-[0.85] saturate-100"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-16 sm:py-0">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="font-sans text-[8px] sm:text-[10px] font-medium tracking-[0.25em] uppercase text-[#C9A96E]/90">
                  Royaume & Héritage des Grassfields
                </span>
              </div>

              <h1 className="font-serif text-[38px] sm:text-[64px] lg:text-[96px] font-bold text-[#F5EDD8] leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-6">
                Histoire du village<br />
                <em className="italic text-[#C9A96E]">Bangang</em>
              </h1>

              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-10 sm:w-16 h-px bg-[#C9A96E]/60" />
                <span className="font-sans text-[8px] sm:text-[11px] tracking-[0.2em] uppercase text-[#C9A96E]/70">
                  Origine, fondation et dynastie
                </span>
                <div className="w-10 sm:w-16 h-px bg-[#C9A96E]/60" />
              </div>

              <p className="font-serif text-[16px] sm:text-[22px] italic text-[#F5EDD8]/80 leading-relaxed max-w-2xl mb-8 sm:mb-10">
                Un royaume atypique des Grassfields, entre tradition et modernité
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="#histoire" className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] active:scale-[0.98]">
                  Explorer l'histoire <FiArrowRight size={14} />
                </Link>
                <Link href="/culture" className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-[#C9A96E]/40 text-[#F5EDD8] font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E]/80 active:scale-[0.98]">
                  Découvrir la culture <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            INTRODUCTION
        ══════════════════════════════════════════════════════ */}
        <section id="histoire" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-5xl mx-auto text-center">
            <FaLandmark className="text-3xl sm:text-4xl text-[#C9A96E] mx-auto mb-5 sm:mb-6" />
            <SectionLabel>Origines</SectionLabel>
            <h2 className="font-serif text-[26px] sm:text-[36px] lg:text-[48px] font-bold text-[#1A1712] leading-tight mb-6 sm:mb-8">
              Introduction historique
            </h2>
            <p className="font-sans text-[14px] sm:text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
              Situé dans le département des Bamboutos, arrondissement de Batcham,
              le groupement Bangang est l'un des plus peuplés de la région de l'Ouest du Cameroun
              — <strong className="text-[#C9A96E]">140 000 habitants sur 134 km²</strong> — troisième chefferie
              de premier degré après Bandjoun et Bafoussam.
            </p>
            <p className="font-sans text-[14px] sm:text-[16px] text-[#1A1712]/70 leading-relaxed mb-4">
              Bangang fait partie du grand ensemble ethnolinguistique <strong className="text-[#1A1712]">Ngyemboon</strong>, peuple des hautes terres de l'Ouest.
              Les origines de la monarchie Bangang, comme celles des populations Bamiléké, sont encore mal élucidées.
              Ces peuples tirent leur origine du Soudan ancien et auraient suivi des mouvements migratoires
              pour arriver au Cameroun par le nord du Nigeria, s'établissant dans les Grassfields au <strong className="text-[#C9A96E]">XVIIIe siècle</strong>.
            </p>
            <p className="font-sans text-[14px] sm:text-[16px] text-[#1A1712]/70 leading-relaxed">
              La chefferie Bangang est née dans la deuxième moitié du XVIIIe siècle.
              Bangang se distingue par sa chefferie de premier degré (1977),
              et par sa tradition monarchique : un royaume guerrier et fédérateur
              ayant su préserver son identité face à la modernité.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CHRONOLOGIE CLÉS
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#0D0B07] py-10 sm:py-16 px-4 sm:px-8 lg:px-20 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <SectionLabel light>Chronologie</SectionLabel>
              <h2 className="font-serif text-[22px] sm:text-[30px] font-bold text-[#F5EDD8]">Dates clés du Royaume</h2>
            </div>
            {/* Timeline horizontale sur desktop, verticale sur mobile */}
            <div className="relative">
              {/* Ligne horizontale desktop */}
              <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-[#C9A96E]/20" />
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {KEY_DATES.map((d, i) => (
                  <div key={i} className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center">
                    {/* Dot desktop */}
                    <div className="hidden lg:flex w-3 h-3 rounded-full bg-[#C9A96E] mx-auto mb-4 relative z-10 flex-shrink-0" />
                    {/* Dot mobile */}
                    <div className="lg:hidden w-2.5 h-2.5 rounded-full bg-[#C9A96E] mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-serif text-[#C9A96E] text-lg sm:text-xl font-bold mb-0.5 lg:mb-1">{d.year}</div>
                      <div className="font-sans text-[11px] sm:text-xs font-semibold text-[#F5EDD8]/80 uppercase tracking-wider mb-1 sm:mb-2">{d.label}</div>
                      <div className="font-sans text-[11px] sm:text-[12px] text-[#F5EDD8]/45 leading-relaxed">{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FONDATION
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-12 sm:py-20 px-4 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <div>
                <GiKing className="text-3xl sm:text-4xl text-[#C9A96E] mb-5" />
                <SectionLabel>Fondation</SectionLabel>
                <h2 className="font-serif text-[26px] sm:text-[36px] lg:text-[44px] font-bold text-[#1A1712] leading-tight mb-5 sm:mb-6">
                  La fondation par <span className="text-[#C9A96E]">Fouo Patouo</span>
                </h2>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#1A1712]/65 leading-relaxed mb-4">
                  <strong className="text-[#1A1712]">Ngang</strong> fut l'illustre choix du peuple réuni à <em>Nzye</em> (commencement).
                  Au cours de l'assemblée fondatrice, le peuple se répartit le territoire.
                  C'est <strong className="text-[#C9A96E]">Fouo Patouo</strong>, le grand guerrier, qui installa définitivement sa chefferie
                  à l'emplacement actuel — d'abord à Mola près de Toumefong, puis vers Balena par Batcham.
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#1A1712]/65 leading-relaxed mb-6">
                  Les autres chefs fondateurs se répartirent ainsi : Fouo Woum à Badatchio,
                  Niyo Lontsie à Balatchi, Mekem Njyotio à Bali, Mekem Njo Nang à Balafotio,
                  et Mekem Tambwa à Batormeo.
                </p>
                <div className="mb-6">
                  <p className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#C9A96E] uppercase tracking-widest mb-3">Villages fondateurs</p>
                  <div className="flex flex-wrap gap-2">
                    {FOUNDING_VILLAGES.map((v, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/70 rounded-full text-[12px] sm:text-[13px] text-[#1A1712]/70 border border-[#C9A96E]/20 font-sans">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/60 rounded-xl border border-[#C9A96E]/15">
                  <p className="font-serif text-[14px] sm:text-[15px] italic text-[#1A1712]/60 leading-relaxed">
                    « Depuis la fondation de Nzye par Fouo Patouo, on compte dix-neuf monarchies qui se sont succédé
                    à la tête du Royaume Bangang. »
                  </p>
                  <p className="font-sans text-[10px] text-[#1A1712]/35 mt-2">— Bangang Infos N° 001, juin 2016</p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-[240px] sm:h-[380px] lg:h-[480px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/bams.jpg" alt="Chefferie Bangang" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-sans text-[10px] text-white/60 uppercase tracking-widest">Vue du palais royal</p>
                  </div>
                </div>
                <div className="hidden sm:block absolute -bottom-5 -right-5 w-24 h-24 border-b-2 border-r-2 border-[#C9A96E]/40 rounded-br-2xl" />
                <div className="hidden sm:block absolute -top-5 -left-5 w-24 h-24 border-t-2 border-l-2 border-[#C9A96E]/40 rounded-tl-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            LISTE COMPLÈTE DES 19 ROIS
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#0D0B07] py-14 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-20 relative overflow-hidden">
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <GiCrown className="text-3xl sm:text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel light>Dynastie royale</SectionLabel>
              <h2 className="font-serif text-[28px] sm:text-[38px] lg:text-[48px] font-bold text-[#F5EDD8] leading-tight">
                Les <em className="italic text-[#C9A96E]">19 Rois</em> du Royaume Bangang
              </h2>
              <p className="font-sans text-[13px] sm:text-[14px] text-[#F5EDD8]/45 mt-3 max-w-2xl mx-auto">
                Une lignée ininterrompue depuis la fondation au XVIIIe siècle jusqu'à aujourd'hui
              </p>
            </div>

            {/* Grille des rois */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {KINGS.map((king) => (
                <div
                  key={king.num}
                  className={`relative p-4 sm:p-5 rounded-xl border transition-all duration-300 group ${
                    king.current
                      ? 'border-[#C9A96E] bg-gradient-to-br from-[#C9A96E]/10 to-[#C9A96E]/5'
                      : 'border-[#C9A96E]/10 bg-[#111009] hover:border-[#C9A96E]/30'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Numéro */}
                    <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm ${
                      king.current ? 'bg-[#C9A96E] text-[#0D0B07]' : 'bg-[#C9A96E]/10 text-[#C9A96E]'
                    }`}>
                      {king.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Nom principal */}
                      <h3 className={`font-serif font-semibold leading-tight mb-0.5 ${
                        king.current ? 'text-[#C9A96E] text-[16px] sm:text-[17px]' : 'text-[#F5EDD8] text-[14px] sm:text-[15px]'
                      }`}>
                        {king.name}
                      </h3>
                      {/* Nom en langue locale */}
                      <p className="font-sans text-[10px] sm:text-[11px] text-[#F5EDD8]/35 italic mb-1.5">{king.subtitle}</p>
                      {/* Ère / dates */}
                      {king.era && (
                        <span className={`inline-block font-sans text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full mb-2 font-medium ${
                          king.current ? 'bg-[#C9A96E]/20 text-[#C9A96E]' : 'bg-[#C9A96E]/10 text-[#C9A96E]/70'
                        }`}>
                          {king.era}
                        </span>
                      )}
                      {/* Note historique */}
                      {king.note && (
                        <p className="font-sans text-[11px] sm:text-[12px] text-[#F5EDD8]/45 leading-relaxed">{king.note}</p>
                      )}
                      {/* Badge actuel */}
                      {king.current && (
                        <div className="mt-3 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                          <span className="font-sans text-[9px] sm:text-[10px] font-semibold text-[#C9A96E] uppercase tracking-widest">Roi actuel</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Citation de clôture */}
            <div className="mt-10 sm:mt-14 max-w-3xl mx-auto text-center">
              <div className="w-px h-8 bg-[#C9A96E]/30 mx-auto mb-6" />
              <p className="font-serif text-[15px] sm:text-lg italic text-[#F5EDD8]/45 leading-relaxed">
                « Une lignée de 19 souverains ayant marqué l'histoire du Royaume Bangang,
                du peuple Ngyemboon, et des peuples des Grassfields. »
              </p>
              <p className="font-sans text-[10px] text-[#F5EDD8]/25 mt-3 uppercase tracking-widest">
                Extrait de Bangang Infos N° 001 — Synthèse La'akam Actu Magazine
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TERRITOIRE & GÉOGRAPHIE
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#EDE9DF] py-12 sm:py-20 px-4 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <FiMapPin className="text-3xl sm:text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Géographie</SectionLabel>
              <h2 className="font-serif text-[26px] sm:text-[36px] lg:text-[48px] font-bold text-[#1A1712] leading-tight">
                Un territoire stratégique des <span className="text-[#C9A96E]">Monts Bamboutos</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10 sm:mb-12">
              <div>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#1A1712]/65 leading-relaxed mb-4">
                  Bangang s'étend sur le <strong className="text-[#1A1712]">flanc oriental des Monts Bamboutos</strong> avec une superficie
                  de <strong className="text-[#C9A96E]">134 km²</strong>. Du fait de sa forme tentaculaire liée à sa longue histoire,
                  Bangang partage sa frontière (<strong className="text-[#C9A96E]">~90 km</strong>) avec une dizaine de groupements
                  répartis dans trois départements (Menoua, Lebialem et Bamboutos) et deux régions (Ouest et Sud-Ouest).
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#1A1712]/65 leading-relaxed">
                  Bangang-ville est située dans la partie centrale du territoire, à
                  <strong className="text-[#C9A96E]"> 17 km de Mbouda</strong> et à <strong className="text-[#C9A96E]">7 km de Batcham</strong>.
                  Les points les plus éloignés du centre : Messang (15 km au NW), Bamemboro (14 km au NE)
                  et Bantsiet (8,5 km au SE).
                </p>
              </div>
              {/* Stats territoire */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { val: '134 km²', label: 'Superficie' },
                  { val: '~90 km', label: 'Frontière totale' },
                  { val: '3', label: 'Départements frontaliers' },
                  { val: '2', label: 'Régions frontalières' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/60 rounded-xl p-4 sm:p-5 border border-[#C9A96E]/10 text-center">
                    <div className="font-serif text-[22px] sm:text-[28px] font-bold text-[#C9A96E] leading-none mb-1">{s.val}</div>
                    <div className="font-sans text-[10px] sm:text-[11px] text-[#1A1712]/50 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tableau voisins */}
            <div>
              <p className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#C9A96E] uppercase tracking-widest mb-4">Groupements frontaliers</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {NEIGHBORS.map((n, i) => (
                  <div key={i} className="bg-white/50 p-3 sm:p-4 rounded-xl border border-[#C9A96E]/10 flex items-start gap-3">
                    <span className="text-[#C9A96E] text-lg font-bold flex-shrink-0 leading-none mt-0.5">{n.icon}</span>
                    <div>
                      <div className="font-serif text-[13px] sm:text-[14px] font-semibold text-[#1A1712] mb-0.5">{n.direction}</div>
                      <p className="font-sans text-[11px] sm:text-[12px] text-[#1A1712]/55 leading-relaxed">{n.villages}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            POPULATION
        ══════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-20 px-4 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <FiUsers className="text-3xl sm:text-4xl text-[#C9A96E] mb-5" />
                <SectionLabel>Démographie</SectionLabel>
                <h2 className="font-serif text-[26px] sm:text-[36px] lg:text-[44px] font-bold text-[#1A1712] leading-tight mb-5">
                  Population & <span className="text-[#C9A96E]">dynamique sociale</span>
                </h2>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#1A1712]/65 leading-relaxed mb-4">
                  La population de Bangang est estimée à environ <strong className="text-[#C9A96E]">140 000 habitants</strong>,
                  pour une densité dépassant <strong className="text-[#C9A96E]">1 000 habitants/km²</strong>.
                  Troisième chefferie de premier degré de l'Ouest après Bandjoun et Bafoussam.
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#1A1712]/65 leading-relaxed mb-4">
                  Il s'agit d'une population très dynamique qui, sous la pression démographique,
                  est en proie aux migrations temporaires pour les activités agricoles
                  vers les zones moins peuplées du département.
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#1A1712]/65 leading-relaxed">
                  Près de <strong className="text-[#C9A96E]">2/3 de cette population</strong> vit dans les villes —
                  Douala, Yaoundé, Bafoussam, Bamenda ou dans le Moungo — tout en conservant
                  leurs droits à la terre au village.
                </p>
              </div>
              {/* Chiffres clés */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {[
                  { val: '140 000', label: 'Habitants estimés', sub: 'Troisième chefferie de l\'Ouest' },
                  { val: '+1 000/km²', label: 'Densité de population', sub: 'Parmi les plus élevées de la région' },
                  { val: '~2/3', label: 'Vivent en diaspora', sub: 'Douala, Yaoundé, Bafoussam, Bamenda...' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 sm:p-5 bg-gradient-to-r from-[#EDE9DF] to-[#F4F0E8] rounded-xl border border-[#C9A96E]/10">
                    <div className="flex-shrink-0">
                      <div className="font-serif text-[22px] sm:text-[28px] font-bold text-[#C9A96E] leading-none">{s.val}</div>
                    </div>
                    <div>
                      <div className="font-sans text-[12px] sm:text-[13px] font-semibold text-[#1A1712]">{s.label}</div>
                      <div className="font-sans text-[11px] sm:text-[12px] text-[#1A1712]/45">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HÉRITAGE & SINGULARITÉ
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-20 px-4 sm:px-8 lg:px-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/roibangang.jpg" alt="Héritage Bangang" fill className="object-cover brightness-[0.25] saturate-70" aria-hidden />
          </div>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#C9A96E]/60 mb-5 sm:mb-6">
              ◈ &nbsp; Patrimoine &nbsp; ◈
            </div>
            <h2 className="font-serif text-[26px] sm:text-[38px] lg:text-[56px] font-bold text-[#F5EDD8] leading-tight mb-5 sm:mb-6">
              Héritage et singularité
            </h2>
            <p className="font-sans text-[13px] sm:text-[15px] text-[#F5EDD8]/60 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10">
              Bangang incarne un modèle de royauté africaine moderne :
              autorité traditionnelle forte, conseil structuré des 9, notables et dignitaires,
              avec une ouverture vers l'éducation, le développement et la diaspora.
              Chaque roi a joué un rôle clé dans la cohésion du peuple et la préservation
              des coutumes Ngyemboon.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 sm:gap-6 mb-8 sm:mb-10">
              {[
                { icon: FiShield, label: 'Autorité traditionnelle' },
                { icon: FiUsers, label: 'Conseil des 9' },
                { icon: FaGlobeAfrica, label: 'Diaspora active' },
                { icon: FaMountain, label: 'Chefferie 1er degré' },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                  <Icon className="text-[#C9A96E] text-sm sm:text-base" />
                  <span className="text-[11px] sm:text-sm text-white/80">{label}</span>
                </div>
              ))}
            </div>
            <Link href="/culture" className="inline-flex items-center gap-2 sm:gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] active:scale-[0.98]">
              Découvrir la culture <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30" />
        </section>

        {/* ══════════════════════════════════════════════════════
            CRÉDIT SOURCE
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#F4F0E8] py-8 sm:py-10 px-4 sm:px-8 lg:px-20 border-t border-[#C9A96E]/10">
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-sans text-[10px] sm:text-[11px] text-[#1A1712]/35 uppercase tracking-widest">
              Sources · Extrait de <em>Bangang Infos N° 001</em>, juin 2016 — Synthèse de La'akam Actu Magazine
            </p>
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