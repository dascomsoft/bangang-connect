'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section avec animation */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className={`relative container mx-auto px-4 py-20 lg:py-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <span className="text-white font-semibold">🌟 Bienvenue sur Bangang Connect</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              Connectez-vous à votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Communauté Bangang
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              La plateforme qui unit la communauté Bangang du Cameroun et de la diaspora
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>🚀 Commencer maintenant</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                🔑 Se connecter
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section avec animations au scroll */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir{' '}
            <span className="gradient-text">Bangang Connect</span>
          </h2>
          <p className="text-xl text-gray-600">
            Une plateforme moderne au service de votre communauté
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 card-hover">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">🌍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Communautés</h3>
            <p className="text-gray-600 leading-relaxed">
              Rejoignez votre ville ou pays d'origine et connectez-vous avec les membres de votre région
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-blue-600 font-semibold">Plus de 20 communautés →</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 card-hover hover:shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">💬</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Chat en direct</h3>
            <p className="text-gray-600 leading-relaxed">
              Échangez en temps réel avec les membres de votre secteur en toute sécurité
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-green-600 font-semibold">Modération intelligente →</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 card-hover">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">📅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Événements</h3>
            <p className="text-gray-600 leading-relaxed">
              Organisez, boostez et participez aux événements de votre secteur
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-purple-600 font-semibold">Système de boost →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section avec compteurs animés */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-pulse">500+</div>
              <div className="text-blue-100 text-lg">Membres actifs</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-pulse">20+</div>
              <div className="text-blue-100 text-lg">Communautés</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-pulse">50+</div>
              <div className="text-blue-100 text-lg">Événements organisés</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section finale */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center transform hover:scale-105 transition-transform duration-500">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Inscrivez-vous maintenant et faites partie de la plus grande communauté Bangang
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-900 bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            🎉 S'inscrire gratuitement
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}