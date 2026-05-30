// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import Card from '@/components/ui/Card';

// export default function HomePage() {

//   return (
//     <main className="w-full overflow-hidden bg-white">

//       {/* ================================================= */}
//       {/* HERO SECTION */}
//       {/* ================================================= */}
//       <section className="relative w-full min-h-[85vh] overflow-hidden">

//         {/* BACKGROUND IMAGE */}
//         <div className="absolute inset-0">

//           <Image
//             src="/roibangang.jpg"
//             alt="Royaume Bangang"
//             fill
//             priority
//             className="object-cover object-center"
//           />

//           {/* DARK OVERLAY */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

//           {/* EXTRA EFFECT */}
//           <div className="absolute inset-0 bg-black/20" />
//         </div>

//         {/* CONTENT */}
//         <div className=" relative z-10 flex items-center min-h-[85vh]">

//           <div className="container mx-auto px-4 ">

//               {/* BADGE */}
//               <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">

//                 <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />

//                 <span className="uppercase tracking-[0.25em] text-xs md:text-sm text-white/90 font-medium">
//                   Royaume des Bamboutos
//                 </span>
//               </div>

//               {/* TITLE */}
//               <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] text-white mb-8">

//                 Bienvenue à{' '}

//                 <span className="text-yellow-400">
//                   Bangang
//                 </span>

//               </h1>

//               {/* SUBTITLE */}
//               <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light leading-relaxed mb-8 max-w-3xl">
//                 Un Royaume Atypique en Pleine Renaissance Culturelle
//               </p>

//               {/* DESCRIPTION */}
//               <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mb-12">

//                 Terre d’histoire millénaire, de sites sacrés majestueux et de dynamisme communautaire.

//                 Sous le leadership de{' '}

//                 <strong className="text-yellow-300">
//                   S.M. Momo Keubou Serges Evariste
//                 </strong>

//                 , 19e Roi du Royaume Bangang.

//               </p>

//               {/* BUTTONS */}
//               <div className="flex flex-wrap gap-5">

//                 <Link
//                   href="/history"
//                   className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-600 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl hover:scale-105 transition duration-300"
//                 >

//                   <span className="relative z-10">
//                     Découvrir notre Histoire
//                   </span>

//                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

//                 </Link>

//                 <Link
//                   href="/culture"
//                   className="border border-white/30 backdrop-blur-md bg-white/10 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300"
//                 >
//                   Explorer la Culture
//                 </Link>

//               </div>

//           </div>

//         </div>

//         {/* SCROLL INDICATOR */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">

//           <div className="flex flex-col items-center gap-2 text-white/70">

//             <span className="text-xs tracking-[0.3em] uppercase">
//               Scroll
//             </span>

//             <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center">

//               <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* STATISTIQUES */}
//       {/* ================================================= */}
//       <section className="container mx-auto px-4 bg-white py-14 border-b">

//         <div className="">

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

//             <div>
//               <div className="text-4xl font-black text-blue-700">
//                 140,000
//               </div>

//               <div className="text-gray-600 mt-2">
//                 Habitants
//               </div>
//             </div>

//             <div>
//               <div className="text-4xl font-black text-blue-700">
//                 134
//               </div>

//               <div className="text-gray-600 mt-2">
//                 km² de territoire
//               </div>
//             </div>

//             <div>
//               <div className="text-4xl font-black text-blue-700">
//                 19
//               </div>

//               <div className="text-gray-600 mt-2">
//                 Rois dans la dynastie
//               </div>
//             </div>

//             <div>
//               <div className="text-4xl font-black text-blue-700">
//                 99.5
//               </div>

//               <div className="text-gray-600 mt-2">
//                 FM - Radio Émergent
//               </div>
//             </div>

//           </div>

//         </div>

//       </section>

//       {/* MAIN SECTIONS */}
//       {/* ================================================= */}
//       <section className="max-w-7xl mx-auto px-6 py-24">

//         <div className="grid md:grid-cols-3 gap-10">

//           {/* HISTOIRE */}
//           <Link href="/history" className="group">

//             <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

//               <div className="h-72 relative overflow-hidden">

//                 <Image
//                   src="/bams.jpg"
//                   alt="Chefferie Bangang"
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-700"
//                 />

//               </div>

//               <div className="p-8">

//                 <h2 className="text-3xl font-bold mb-4">
//                   Notre Histoire
//                 </h2>

//                 <p className="text-gray-600 leading-relaxed mb-6">
//                   Découvrez l’origine, la fondation par Fouo Patouo et la prestigieuse dynastie des rois du royaume Ngyemboon.
//                 </p>

//                 <span className="text-blue-700 font-semibold group-hover:underline">
//                   En savoir plus →
//                 </span>

//               </div>

//             </Card>

//           </Link>

//           {/* CULTURE */}
//           <Link href="/culture" className="group">

//             <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

//               <div className="h-72 relative overflow-hidden">

//                 <Image
//                   src="/bams1.jpg"
//                   alt="Culture Bangang"
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-700"
//                 />

//               </div>

//               <div className="p-8">

//                 <h2 className="text-3xl font-bold mb-4">
//                   Culture & Patrimoine
//                 </h2>

//                 <p className="text-gray-600 leading-relaxed mb-6">
//                   Chute de Mekoup, forêt sacrée, tenues royales et renaissance culturelle du royaume Bangang.
//                 </p>

//                 <span className="text-blue-700 font-semibold group-hover:underline">
//                   Explorer le patrimoine →
//                 </span>

//               </div>

//             </Card>

//           </Link>

//           {/* NEWS */}
//           <Link href="/news" className="group">

//             <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

//               <div className="h-72 relative overflow-hidden">

//                 <Image
//                   src="/bams3.jpg"
//                   alt="Actualités Bangang"
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-700"
//                 />

//               </div>

//               <div className="p-8">

//                 <h2 className="text-3xl font-bold mb-4">
//                   Actualités
//                 </h2>

//                 <p className="text-gray-600 leading-relaxed mb-6">
//                   Reconstruction de la chefferie, musée royal et initiatives culturelles communautaires.
//                 </p>

//                 <span className="text-blue-700 font-semibold group-hover:underline">
//                   Voir les actualités →
//                 </span>

//               </div>

//             </Card>

//           </Link>

//         </div>

//       </section>

//     </main>
//   );
// }















'use client';

import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import HeritageSection from '@/components/sections/HeritageSection';


import {
  FaCrown,
  FaLandmark,
  FaUsers,
  FaMountain,
  FaLeaf,
  FaGlobeAfrica,
  FaArrowRight,
  
} from 'react-icons/fa';

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden bg-white">

      {/* HERO SECTION                                      */}
      <section className="relative w-full min-h-[90vh] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src="/roibangang.jpg"
            alt="Royaume Bangang"
            fill
            priority
            className="object-cover object-center scale-105"
          />

          {/* RICH GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-800/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-center min-h-[90vh]">
          <div className="max-w-7xl mx-auto px-6 w-full">

            {/* BADGE */}
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-10 animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="uppercase tracking-[0.25em] text-xs md:text-sm text-white/90 font-semibold">
                Royaume des Bamboutos
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] text-white mb-6">
              Bienvenue à{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                Bangang
              </span>
            </h1>

            {/* DECORATIVE LINE */}
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-8" />

            {/* SUBTITLE */}
            <p className="text-xl md:text-2xl lg:text-3xl text-blue-100/90 font-light leading-relaxed mb-6 max-w-3xl">
              Un Royaume Atypique en Pleine Renaissance Culturelle
            </p>

            {/* DESCRIPTION */}
            <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mb-12">
              Terre d'histoire millénaire, de sites sacrés majestueux et de dynamisme communautaire.
              Sous le leadership de{' '}
              <strong className="text-yellow-300 font-semibold">
                S.M. Momo Keubou Serges Evariste
              </strong>
              , 19<sup>e</sup> Roi du Royaume Bangang.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5">
              <Link
                href="/history"
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-600 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-1 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Découvrir notre Histoire
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>

              <Link
                href="/culture"
                className="group border border-white/30 backdrop-blur-xl bg-white/10 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-500 hover:-translate-y-1"
              >
                Explorer la Culture
              </Link>
            </div>

          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-3 text-white/60">
            <span className="text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* =================STATISTIQUES================================ */}
      
      <section className="relative z-20 -mt-16 container mx-auto px-6 mb-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-slate-100">
            
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
                140,000
              </div>
              <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
                Habitants
              </div>
            </div>

            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
                134
              </div>
              <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
                km² de territoire
              </div>
            </div>

            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
                19
              </div>
              <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
                Rois dans la dynastie
              </div>
            </div>

            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
                99.5
              </div>
              <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
                FM - Radio Émergent
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =================== HÉRITAGE ROYAL============================== */}
      
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 text-yellow-600 font-bold mb-5 uppercase tracking-widest text-sm">
              <FaCrown className="text-lg" />
              <span>Héritage Royal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Une Dynastie au Service<br className="hidden md:block" /> de la Tradition
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
              Bangang est l'une des chefferies majeures des Bamboutos.
              Son histoire, transmise depuis plusieurs générations,
              demeure un pilier de l'identité Ngyemboon.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-yellow-100 transition-all duration-500">
                <FaCrown className="text-3xl text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                Monarchie Traditionnelle
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Une institution ancestrale garante des valeurs,
                de la cohésion sociale et de la transmission culturelle.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500">
                <FaLandmark className="text-3xl text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                Patrimoine Historique
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Un riche héritage constitué de traditions,
                de rites et d'une mémoire collective exceptionnelle.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-500">
                <FaUsers className="text-3xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                Peuple Uni
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Une communauté active qui contribue à la préservation
                et au développement du royaume.
              </p>
            </div>

          </div>

        </div>
      </section>

    {/* Section Patrimoine avec effet parallaxe */}
      <HeritageSection />

      {/* ==================EXPLOIRATION=============================== */}
     
      <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.2em] text-blue-700 font-bold text-sm mb-4 block">
            Explorer
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Plongez dans l'univers Bangang
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* HISTOIRE */}
          <Link href="/history" className="group block">
            <Card className="overflow-hidden h-full border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 group-hover:-translate-y-3 rounded-[2.5rem] bg-white">
              <div className="h-80 relative overflow-hidden">
                <Image
                  src="/bams.jpg"
                  alt="Chefferie Bangang"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                  Notre Histoire
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Découvrez l'origine, la fondation par Fouo Patouo et la prestigieuse dynastie des rois du royaume Ngyemboon.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-4 transition-all duration-300">
                  En savoir plus <FaArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Card>
          </Link>

          {/* CULTURE */}
          <Link href="/culture" className="group block">
            <Card className="overflow-hidden h-full border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 group-hover:-translate-y-3 rounded-[2.5rem] bg-white">
              <div className="h-80 relative overflow-hidden">
                <Image
                  src="/bams1.jpg"
                  alt="Culture Bangang"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                  Culture & Patrimoine
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Chute de Mekoup, forêt sacrée, tenues royales et renaissance culturelle du royaume Bangang.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-4 transition-all duration-300">
                  Explorer le patrimoine <FaArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Card>
          </Link>

          {/* NEWS */}
          <Link href="/news" className="group block">
            <Card className="overflow-hidden h-full border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 group-hover:-translate-y-3 rounded-[2.5rem] bg-white">
              <div className="h-80 relative overflow-hidden">
                <Image
                  src="/bams3.jpg"
                  alt="Actualités Bangang"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                  Actualités
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Reconstruction de la chefferie, musée royal et initiatives culturelles communautaires.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-4 transition-all duration-300">
                  Voir les actualités <FaArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Card>
          </Link>

        </div>
      </section>

      {/* ==================PATRIMOINE NATUREL=============================== */}
   
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div className="order-2 lg:order-1">
              <span className="uppercase tracking-[0.3em] text-green-700 font-bold text-sm mb-4 block">
                Patrimoine Naturel
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 mb-8 leading-tight">
                Entre montagnes<br />et sites sacrés
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                Situé au cœur des hauts plateaux de l'Ouest Cameroun,
                Bangang possède un patrimoine naturel remarquable,
                marqué par ses paysages, ses forêts et ses espaces sacrés.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors duration-300">
                    <FaMountain className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">
                      Relief des Bamboutos
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Un environnement exceptionnel caractéristique des hauts plateaux.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors duration-300">
                    <FaLeaf className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">
                      Forêts et espaces sacrés
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Des lieux de mémoire et de spiritualité préservés.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-300/40 group">
              <Image
                src="/bams1.jpg"
                alt="Patrimoine Bangang"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[3rem]" />
            </div>

          </div>
        </div>
      </section>

      {/* ====================VISION DU ROYAUME============================= */}
      
      <section className="py-28 lg:py-36 bg-slate-950 text-white relative overflow-hidden">
        
        {/* AMBIENT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-yellow-950/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          
          <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-10 ring-1 ring-yellow-500/20">
            <FaGlobeAfrica className="text-5xl text-yellow-400" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
            Une Renaissance Culturelle<br />en Marche
          </h2>

          <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-3xl mx-auto">
            Sous l'impulsion des autorités traditionnelles et de la communauté,
            Bangang poursuit une dynamique de modernisation tout en préservant
            son identité culturelle et historique.
          </p>

          <Link
            href="/news"
            className="group inline-flex items-center gap-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 px-10 py-5 rounded-full font-bold text-lg transition-all duration-500 shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-1"
          >
            Découvrir les initiatives
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

        </div>
      </section>

      {/* ==================CTA FINAL=============================== */}
     
      <section className="py-24 lg:py-32 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mx-auto mb-8">
            {/* <FaRadio className="text-4xl text-blue-700" /> */}
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Rejoignez la communauté<br />Bangang
          </h2>

          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Suivez l'actualité du royaume, découvrez son histoire,
            son patrimoine et participez à sa valorisation.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/news"
              className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-blue-700/20"
            >
              Actualités
            </Link>

            <Link
              href="/culture"
              className="border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
            >
              Patrimoine Culturel
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}








































































































