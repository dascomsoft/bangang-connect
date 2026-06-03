'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GiCrown, GiAfrica } from 'react-icons/gi';
import { FiHeart, FiChevronRight } from 'react-icons/fi';

const messages = [
  { text: 'Bienvenue', lang: 'Français' },
  { text: 'Welcome', lang: 'English' },
  { text: 'Seleto\'o', lang: 'Ngiemboon' },
];

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Afficher les messages en séquence (0.8s chacun)
  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // Dernier message affiché, montrer le bouton
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#4b4a48] to-[#1A1712] flex flex-col items-center justify-center">
      {/* Décoration de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl" />
      </div>

      {/* Bandes décoratives */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

      {/* Logo central */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full" />
        <div className="absolute inset-0 rounded-full" />
        <div className="relative w-60 h-60 md:w-60 md:h-60 rounded-full flex items-center justify-center ">
          <Image
            src="/banganglogo.png"
            alt="BangangConnect Logo"
            width={300}
            height={300}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Titre */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#F5EDD8] mb-6 text-center">
        Bangang<span className="text-[#C9A96E]">Connect</span>
      </h1>

      {/* Message animé */}
      <div className="text-center mb-10 min-h-[120px]">
        <p className="font-serif text-4xl md:text-6xl font-bold text-[#C9A96E] mb-3 animate-fadeInUp">
          {messages[currentMessageIndex]?.text}
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-px bg-[#C9A96E]/30" />
          <p className="font-sans text-xs text-[#F5EDD8]/50 uppercase tracking-wider">
            {messages[currentMessageIndex]?.lang}
          </p>
          <div className="w-8 h-px bg-[#C9A96E]/30" />
        </div>
      </div>

      {/* BOUTON COMMENCER - Apparaît après les messages */}
      {showButton && (
        <button
          onClick={onComplete}
          className="group inline-flex items-center gap-3 px-10 py-4 bg-[#C9A96E] text-[#0D0B07] rounded-full font-sans text-base md:text-lg font-bold tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(201,169,110,0.4)] active:scale-[0.98] shadow-2xl animate-bounceIn"
        >
          Commencer l'aventure
          <FiChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      )}

      {/* Indicateur de chargement avant le bouton */}
      {!showButton && (
        <div className="mt-4 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#C9A96E]/50 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-[#C9A96E]/30 animate-pulse delay-150" />
          <div className="w-2 h-2 rounded-full bg-[#C9A96E]/15 animate-pulse delay-300" />
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="font-sans text-[10px] text-[#F5EDD8]/20 flex items-center justify-center gap-1">
          <FiHeart size={8} className="text-red-500" />
          Royaume des Bamboutos
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.8); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounceIn {
          animation: bounceIn 0.5s ease-out forwards;
        }
        @keyframes ping {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}