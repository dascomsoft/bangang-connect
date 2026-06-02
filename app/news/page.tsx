


















'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  FaBroadcastTower,
  FaChurch,
  FaLandmark,
  FaUniversity,
  FaUsers,
  FaLeaf,
  FaMountain,
  FaBriefcase,
  FaMicrophoneAlt,
  FaCrown,
  FaHandsHelping,
  FaNewspaper,
  FaCalendarAlt
} from 'react-icons/fa';
import { GiAfrica, GiCrown } from 'react-icons/gi';  // ← Modifié
import { FiHeart, FiTrendingUp, FiGlobe } from 'react-icons/fi';

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

// ─── Data ────────────────────────────────────────────────────

const newsItems = [
  {
    id: 1,
    title: "Radio Bangang Émergent (99,5 FM)",
    date: "Lancée en juin 2020",
    description: "La voix officielle de la communauté. Émissions culturelles, débats de développement, journaux et musique en français et en langue Ngyemboon.",
    icon: FaBroadcastTower,
    image: "/bams1.jpg",
    tag: "Média"
  },
  {
    id: 2,
    title: "Reconstruction de la Chefferie Royale",
    date: "En cours",
    description: "Chantier majeur du règne actuel, symbole de la grandeur retrouvée du royaume.",
    icon: FaUniversity,
    image: "/Entrée-palais-royal-Bangang.jpg",
    tag: "Patrimoine"
  },
  {
    id: 3,
    title: "Projet de Musée des Arts et de la Culture",
    date: "En préparation",
    description: "Sauvegarde et transmission du patrimoine culturel aux générations futures.",
    icon: FaLandmark,
    image: "/roibangang.jpg",
    tag: "Culture"
  },
  {
    id: 4,
    title: "Mobilisation de la diaspora",
    date: "Continue",
    description: "Renforcement des liens avec les communautés Bangang dans le monde entier.",
    icon: FaUsers,
    image: "/roibangang1.jpg",
    tag: "Communauté"
  }
];

const initiatives = [
  { icon: FaLeaf, title: "Agriculture durable", desc: "Autosuffisance alimentaire et innovation agricole" },
  { icon: FaMountain, title: "Écotourisme", desc: "Valorisation des sites naturels et culturels" },
  { icon: FaBriefcase, title: "Investissements", desc: "Appel aux opérateurs économiques" },
  { icon: FaHandsHelping, title: "Solidarité", desc: "Entraide communautaire et développement local" }
];

const personalities = [
  {
    name: "Dr Zogning Apollinaire",
    role: "Chef de la Communauté Bangang de Yaoundé",
    quote: "Nous sommes premiers dans le département des Bamboutos et troisième à l'Ouest"
  },
  {
    name: "Pr Morfo Teuwa Clotilde",
    role: "Présidente des Femmes Bangang",
    quote: "La maman Bangang est très dynamique et affiche un leadership inégalé"
  },
  {
    name: "Henri Tassie",
    role: "Personnalité influente",
    quote: "Construire des ponts de solidarité pour le développement"
  }
];

// ─── Main Page ───────────────────────────────────────────────

export default function NewsPage() {
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
              src="/bams3.jpg"
              alt="Actualités Bangang"
              fill
              priority
              className="object-cover object-center brightness-[0.85] saturate-100"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121211] via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
                  Actualités communautaires
                </span>
              </div>

              <h1 className="font-serif text-[clamp(56px,12vw,96px)] font-bold text-[#F5EDD8] leading-[1.05] tracking-[-0.02em] mb-6">
                Actualités<br />
                <em className="italic text-[#C9A96E]">Bangang</em>
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-[#C9A96E]/60" />
                <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/60">
                  Informations communautaires en temps réel
                </span>
                <div className="w-16 h-px bg-[#C9A96E]/60" />
              </div>

              <p className="font-sans text-[16px] text-[#F5EDD8]/70 leading-relaxed max-w-3xl mb-10">
                Restez connecté à la vie du groupement Bangang : initiatives royales,
                projets de développement, événements culturels et opportunités communautaires.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            À LA UNE
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FaNewspaper className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>À la Une</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Les actualités du royaume
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {newsItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="group bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-500 hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#1A1712]/80 backdrop-blur-md rounded-full">
                        <Icon className="w-3 h-3 text-[#C9A96E]" />
                        <span className="font-sans text-[10px] font-medium text-white/80">{item.date}</span>
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#C9A96E]/90 rounded-full">
                        <span className="font-sans text-[9px] font-semibold text-[#0D0B07] tracking-wide">{item.tag}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#1A1712] mb-3">{item.title}</h3>
                      <p className="font-sans text-[14px] text-[#1A1712]/60 leading-relaxed mb-4">{item.description}</p>
                      <Link href="#" className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold text-[#C9A96E] uppercase tracking-wide hover:gap-3 transition-all">
                        Lire la suite
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            RADIO SECTION
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 px-5 sm:px-8 lg:px-20 bg-gradient-to-r from-[#0D0B07] to-[#1A1712]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
                  <FaBroadcastTower className="text-2xl text-[#C9A96E]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Radio Bangang Émergent</h3>
                  <p className="font-sans text-[14px] text-[#C9A96E]/70">99.5 FM - Voix de la communauté</p>
                </div>
              </div>
              <button className="px-8 py-3 bg-[#C9A96E] text-[#0D0B07] font-sans text-[12px] font-semibold tracking-wide rounded-full hover:bg-[#DFC08A] transition-all duration-300 hover:gap-3 inline-flex items-center gap-2">
                Écouter en direct
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            INITIATIVES COMMUNAUTAIRES
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#EDE9DF]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FiHeart className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Engagement</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Engagement communautaire
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl text-center border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A96E]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#C9A96E]" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#1A1712] mb-2">{item.title}</h3>
                    <p className="font-sans text-[13px] text-[#1A1712]/50">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ÉLITES COMMUNAUTAIRES
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,10vh,100px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FaUsers className="text-4xl text-[#C9A96E] mx-auto mb-4" />
              <SectionLabel>Élites</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1712] leading-tight">
                Élites communautaires
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personalities.map((p, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl text-center border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 hover:shadow-xl">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#DFC08A] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {p.name.charAt(0)}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1712]">{p.name}</h3>
                  <p className="font-sans text-[12px] text-[#C9A96E] font-semibold mb-3">{p.role}</p>
                  <p className="font-sans text-[13px] text-[#1A1712]/60 italic">"{p.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            MESSAGE DU ROI
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-[clamp(60px,10vh,80px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0B07] to-[#1A1712]" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <GiCrown  className="text-5xl text-[#C9A96E] mx-auto mb-4" />
            <SectionLabel light>Parole Royale</SectionLabel>
            <h2 className="font-serif text-[clamp(28px,4vw,38px)] font-bold text-[#F5EDD8] leading-tight mb-6">
              Message de Sa Majesté
            </h2>
            <p className="font-serif text-xl italic text-[#F5EDD8]/80 max-w-3xl mx-auto leading-relaxed">
              « Nous travaillons la main dans la main pour un Bangang émergent, fier de ses racines et tourné vers l'avenir. »
            </p>
            <p className="font-sans text-[14px] text-[#C9A96E]/70 mt-6">
              S.M. Momo Keubou Serges Evariste, Roi du Royaume Bangang
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(48px,8vh,80px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8] text-center">
          <div className="max-w-3xl mx-auto">
            <FiTrendingUp className="text-4xl text-[#C9A96E] mx-auto mb-4" />
            <h2 className="font-serif text-[clamp(28px,4vw,38px)] font-bold text-[#1A1712] mb-6">
              Suivez l'actualité du royaume<br />
              <em className="italic text-[#C9A96E]">en temps réel</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1712] text-white font-sans text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#2A2620] hover:gap-4 active:scale-[0.98]"
              >
                Voir les événements
                <span>→</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#C9A96E]/40 text-[#1A1712] font-sans text-[12px] font-normal tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E]/80 hover:gap-4 active:scale-[0.98]"
              >
                Rejoindre la communauté
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}