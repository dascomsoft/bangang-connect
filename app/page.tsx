'use client';

import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';

export default function HomePage() {

  return (
    <main className="w-full overflow-hidden bg-white">

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}
      <section className="relative w-full min-h-[85vh] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">

          <Image
            src="/roibangang.jpg"
            alt="Royaume Bangang"
            fill
            priority
            className="object-cover object-center"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

          {/* EXTRA EFFECT */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-center min-h-[85vh]">

          <div className="container max-auto px-4 md:px-12 lg:px-20">

            <div className="max-w-4xl">

              {/* BADGE */}
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">

                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />

                <span className="uppercase tracking-[0.25em] text-xs md:text-sm text-white/90 font-medium">
                  Royaume des Bamboutos
                </span>
              </div>

              {/* TITLE */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] text-white mb-8">

                Bienvenue à{' '}

                <span className="text-yellow-400">
                  Bangang
                </span>

              </h1>

              {/* SUBTITLE */}
              <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light leading-relaxed mb-8 max-w-3xl">
                Un Royaume Atypique en Pleine Renaissance Culturelle
              </p>

              {/* DESCRIPTION */}
              <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mb-12">

                Terre d’histoire millénaire, de sites sacrés majestueux et de dynamisme communautaire.

                Sous le leadership de{' '}

                <strong className="text-yellow-300">
                  S.M. Momo Keubou Serges Evariste
                </strong>

                , 19e Roi du Royaume Bangang.

              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-5">

                <Link
                  href="/history"
                  className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-600 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl hover:scale-105 transition duration-300"
                >

                  <span className="relative z-10">
                    Découvrir notre Histoire
                  </span>

                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

                </Link>

                <Link
                  href="/culture"
                  className="border border-white/30 backdrop-blur-md bg-white/10 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300"
                >
                  Explorer la Culture
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">

          <div className="flex flex-col items-center gap-2 text-white/70">

            <span className="text-xs tracking-[0.3em] uppercase">
              Scroll
            </span>

            <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center">

              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* STATISTIQUES */}
      {/* ================================================= */}
      <section className="bg-white py-14 border-b">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <div className="text-4xl font-black text-blue-700">
                140,000
              </div>

              <div className="text-gray-600 mt-2">
                Habitants
              </div>
            </div>

            <div>
              <div className="text-4xl font-black text-blue-700">
                134
              </div>

              <div className="text-gray-600 mt-2">
                km² de territoire
              </div>
            </div>

            <div>
              <div className="text-4xl font-black text-blue-700">
                19
              </div>

              <div className="text-gray-600 mt-2">
                Rois dans la dynastie
              </div>
            </div>

            <div>
              <div className="text-4xl font-black text-blue-700">
                99.5
              </div>

              <div className="text-gray-600 mt-2">
                FM - Radio Émergent
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* MAIN SECTIONS */}
      {/* ================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-3 gap-10">

          {/* HISTOIRE */}
          <Link href="/history" className="group">

            <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

              <div className="h-72 relative overflow-hidden">

                <Image
                  src="/bams.jpg"
                  alt="Chefferie Bangang"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

              </div>

              <div className="p-8">

                <h2 className="text-3xl font-bold mb-4">
                  Notre Histoire
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Découvrez l’origine, la fondation par Fouo Patouo et la prestigieuse dynastie des rois du royaume Ngyemboon.
                </p>

                <span className="text-blue-700 font-semibold group-hover:underline">
                  En savoir plus →
                </span>

              </div>

            </Card>

          </Link>

          {/* CULTURE */}
          <Link href="/culture" className="group">

            <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

              <div className="h-72 relative overflow-hidden">

                <Image
                  src="/bams1.jpg"
                  alt="Culture Bangang"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

              </div>

              <div className="p-8">

                <h2 className="text-3xl font-bold mb-4">
                  Culture & Patrimoine
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Chute de Mekoup, forêt sacrée, tenues royales et renaissance culturelle du royaume Bangang.
                </p>

                <span className="text-blue-700 font-semibold group-hover:underline">
                  Explorer le patrimoine →
                </span>

              </div>

            </Card>

          </Link>

          {/* NEWS */}
          <Link href="/news" className="group">

            <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

              <div className="h-72 relative overflow-hidden">

                <Image
                  src="/bams3.jpg"
                  alt="Actualités Bangang"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

              </div>

              <div className="p-8">

                <h2 className="text-3xl font-bold mb-4">
                  Actualités
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Reconstruction de la chefferie, musée royal et initiatives culturelles communautaires.
                </p>

                <span className="text-blue-700 font-semibold group-hover:underline">
                  Voir les actualités →
                </span>

              </div>

            </Card>

          </Link>

        </div>

      </section>

    </main>
  );
}
























































































































