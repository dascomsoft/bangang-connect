// // // 'use client';

// // // import Link from 'next/link';
// // // import Image from 'next/image';
// // // import Card from '@/components/ui/Card';

// // // export default function HomePage() {

// // //   return (
// // //     <main className="w-full overflow-hidden bg-white">

// // //       {/* ================================================= */}
// // //       {/* HERO SECTION */}
// // //       {/* ================================================= */}
// // //       <section className="relative w-full min-h-[85vh] overflow-hidden">

// // //         {/* BACKGROUND IMAGE */}
// // //         <div className="absolute inset-0">

// // //           <Image
// // //             src="/roibangang.jpg"
// // //             alt="Royaume Bangang"
// // //             fill
// // //             priority
// // //             className="object-cover object-center"
// // //           />

// // //           {/* DARK OVERLAY */}
// // //           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

// // //           {/* EXTRA EFFECT */}
// // //           <div className="absolute inset-0 bg-black/20" />
// // //         </div>

// // //         {/* CONTENT */}
// // //         <div className=" relative z-10 flex items-center min-h-[85vh]">

// // //           <div className="container mx-auto px-4 ">

// // //               {/* BADGE */}
// // //               <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">

// // //                 <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />

// // //                 <span className="uppercase tracking-[0.25em] text-xs md:text-sm text-white/90 font-medium">
// // //                   Royaume des Bamboutos
// // //                 </span>
// // //               </div>

// // //               {/* TITLE */}
// // //               <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] text-white mb-8">

// // //                 Bienvenue à{' '}

// // //                 <span className="text-yellow-400">
// // //                   Bangang
// // //                 </span>

// // //               </h1>

// // //               {/* SUBTITLE */}
// // //               <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light leading-relaxed mb-8 max-w-3xl">
// // //                 Un Royaume Atypique en Pleine Renaissance Culturelle
// // //               </p>

// // //               {/* DESCRIPTION */}
// // //               <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mb-12">

// // //                 Terre d’histoire millénaire, de sites sacrés majestueux et de dynamisme communautaire.

// // //                 Sous le leadership de{' '}

// // //                 <strong className="text-yellow-300">
// // //                   S.M. Momo Keubou Serges Evariste
// // //                 </strong>

// // //                 , 19e Roi du Royaume Bangang.

// // //               </p>

// // //               {/* BUTTONS */}
// // //               <div className="flex flex-wrap gap-5">

// // //                 <Link
// // //                   href="/history"
// // //                   className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-600 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl hover:scale-105 transition duration-300"
// // //                 >

// // //                   <span className="relative z-10">
// // //                     Découvrir notre Histoire
// // //                   </span>

// // //                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

// // //                 </Link>

// // //                 <Link
// // //                   href="/culture"
// // //                   className="border border-white/30 backdrop-blur-md bg-white/10 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300"
// // //                 >
// // //                   Explorer la Culture
// // //                 </Link>

// // //               </div>

// // //           </div>

// // //         </div>

// // //         {/* SCROLL INDICATOR */}
// // //         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">

// // //           <div className="flex flex-col items-center gap-2 text-white/70">

// // //             <span className="text-xs tracking-[0.3em] uppercase">
// // //               Scroll
// // //             </span>

// // //             <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center">

// // //               <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />

// // //             </div>

// // //           </div>

// // //         </div>

// // //       </section>

// // //       {/* STATISTIQUES */}
// // //       {/* ================================================= */}
// // //       <section className="container mx-auto px-4 bg-white py-14 border-b">

// // //         <div className="">

// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

// // //             <div>
// // //               <div className="text-4xl font-black text-blue-700">
// // //                 140,000
// // //               </div>

// // //               <div className="text-gray-600 mt-2">
// // //                 Habitants
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <div className="text-4xl font-black text-blue-700">
// // //                 134
// // //               </div>

// // //               <div className="text-gray-600 mt-2">
// // //                 km² de territoire
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <div className="text-4xl font-black text-blue-700">
// // //                 19
// // //               </div>

// // //               <div className="text-gray-600 mt-2">
// // //                 Rois dans la dynastie
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <div className="text-4xl font-black text-blue-700">
// // //                 99.5
// // //               </div>

// // //               <div className="text-gray-600 mt-2">
// // //                 FM - Radio Émergent
// // //               </div>
// // //             </div>

// // //           </div>

// // //         </div>

// // //       </section>

// // //       {/* MAIN SECTIONS */}
// // //       {/* ================================================= */}
// // //       <section className="max-w-7xl mx-auto px-6 py-24">

// // //         <div className="grid md:grid-cols-3 gap-10">

// // //           {/* HISTOIRE */}
// // //           <Link href="/history" className="group">

// // //             <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

// // //               <div className="h-72 relative overflow-hidden">

// // //                 <Image
// // //                   src="/bams.jpg"
// // //                   alt="Chefferie Bangang"
// // //                   fill
// // //                   className="object-cover group-hover:scale-110 transition-transform duration-700"
// // //                 />

// // //               </div>

// // //               <div className="p-8">

// // //                 <h2 className="text-3xl font-bold mb-4">
// // //                   Notre Histoire
// // //                 </h2>

// // //                 <p className="text-gray-600 leading-relaxed mb-6">
// // //                   Découvrez l’origine, la fondation par Fouo Patouo et la prestigieuse dynastie des rois du royaume Ngyemboon.
// // //                 </p>

// // //                 <span className="text-blue-700 font-semibold group-hover:underline">
// // //                   En savoir plus →
// // //                 </span>

// // //               </div>

// // //             </Card>

// // //           </Link>

// // //           {/* CULTURE */}
// // //           <Link href="/culture" className="group">

// // //             <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

// // //               <div className="h-72 relative overflow-hidden">

// // //                 <Image
// // //                   src="/bams1.jpg"
// // //                   alt="Culture Bangang"
// // //                   fill
// // //                   className="object-cover group-hover:scale-110 transition-transform duration-700"
// // //                 />

// // //               </div>

// // //               <div className="p-8">

// // //                 <h2 className="text-3xl font-bold mb-4">
// // //                   Culture & Patrimoine
// // //                 </h2>

// // //                 <p className="text-gray-600 leading-relaxed mb-6">
// // //                   Chute de Mekoup, forêt sacrée, tenues royales et renaissance culturelle du royaume Bangang.
// // //                 </p>

// // //                 <span className="text-blue-700 font-semibold group-hover:underline">
// // //                   Explorer le patrimoine →
// // //                 </span>

// // //               </div>

// // //             </Card>

// // //           </Link>

// // //           {/* NEWS */}
// // //           <Link href="/news" className="group">

// // //             <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl">

// // //               <div className="h-72 relative overflow-hidden">

// // //                 <Image
// // //                   src="/bams3.jpg"
// // //                   alt="Actualités Bangang"
// // //                   fill
// // //                   className="object-cover group-hover:scale-110 transition-transform duration-700"
// // //                 />

// // //               </div>

// // //               <div className="p-8">

// // //                 <h2 className="text-3xl font-bold mb-4">
// // //                   Actualités
// // //                 </h2>

// // //                 <p className="text-gray-600 leading-relaxed mb-6">
// // //                   Reconstruction de la chefferie, musée royal et initiatives culturelles communautaires.
// // //                 </p>

// // //                 <span className="text-blue-700 font-semibold group-hover:underline">
// // //                   Voir les actualités →
// // //                 </span>

// // //               </div>

// // //             </Card>

// // //           </Link>

// // //         </div>

// // //       </section>

// // //     </main>
// // //   );
// // // }















// // 'use client';

// // import Link from 'next/link';
// // import Image from 'next/image';
// // import Card from '@/components/ui/Card';
// // import HeritageSection from '@/components/sections/HeritageSection';


// // import {
// //   FaCrown,
// //   FaLandmark,
// //   FaUsers,
// //   FaMountain,
// //   FaLeaf,
// //   FaGlobeAfrica,
// //   FaArrowRight,

// // } from 'react-icons/fa';

// // export default function HomePage() {
// //   return (
// //     <main className="w-full overflow-hidden bg-white">

// //       {/* HERO SECTION                                      */}
// //       <section className="relative w-full min-h-[90vh] overflow-hidden">

// //         {/* BACKGROUND IMAGE */}
// //         <div className="absolute inset-0">
// //           <Image
// //             src="/roibangang.jpg"
// //             alt="Royaume Bangang"
// //             fill
// //             priority
// //             className="object-cover object-center scale-105"
// //           />

// //           {/* RICH GRADIENT OVERLAY */}
// //           <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-800/50" />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
// //         </div>

// //         {/* CONTENT */}
// //         <div className="relative z-10 flex items-center min-h-[90vh]">
// //           <div className="max-w-7xl mx-auto px-6 w-full">

// //             {/* BADGE */}
// //             <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-10 animate-fade-in-up">
// //               <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
// //               <span className="uppercase tracking-[0.25em] text-xs md:text-sm text-white/90 font-semibold">
// //                 Royaume des Bamboutos
// //               </span>
// //             </div>

// //             {/* TITLE */}
// //             <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] text-white mb-6">
// //               Bienvenue à{' '}
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
// //                 Bangang
// //               </span>
// //             </h1>

// //             {/* DECORATIVE LINE */}
// //             <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-8" />

// //             {/* SUBTITLE */}
// //             <p className="text-xl md:text-2xl lg:text-3xl text-blue-100/90 font-light leading-relaxed mb-6 max-w-3xl">
// //               Un Royaume Atypique en Pleine Renaissance Culturelle
// //             </p>

// //             {/* DESCRIPTION */}
// //             <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mb-12">
// //               Terre d'histoire millénaire, de sites sacrés majestueux et de dynamisme communautaire.
// //               Sous le leadership de{' '}
// //               <strong className="text-yellow-300 font-semibold">
// //                 S.M. Momo Keubou Serges Evariste
// //               </strong>
// //               , 19<sup>e</sup> Roi du Royaume Bangang.
// //             </p>

// //             {/* BUTTONS */}
// //             <div className="flex flex-wrap gap-5">
// //               <Link
// //                 href="/history"
// //                 className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-600 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-1 transition-all duration-500"
// //               >
// //                 <span className="relative z-10 flex items-center gap-2">
// //                   Découvrir notre Histoire
// //                   <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
// //                 </span>
// //                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
// //               </Link>

// //               <Link
// //                 href="/culture"
// //                 className="group border border-white/30 backdrop-blur-xl bg-white/10 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-500 hover:-translate-y-1"
// //               >
// //                 Explorer la Culture
// //               </Link>
// //             </div>

// //           </div>
// //         </div>

// //         {/* SCROLL INDICATOR */}
// //         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
// //           <div className="flex flex-col items-center gap-3 text-white/60">
// //             <span className="text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
// //             <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
// //               <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* BOTTOM FADE */}
// //         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
// //       </section>

// //       {/* =================STATISTIQUES================================ */}

// //       <section className="relative z-20 -mt-16 container mx-auto px-6 mb-20">
// //         <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 md:p-14">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-slate-100">

// //             <div className="group">
// //               <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
// //                 140,000
// //               </div>
// //               <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
// //                 Habitants
// //               </div>
// //             </div>

// //             <div className="group">
// //               <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
// //                 134
// //               </div>
// //               <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
// //                 km² de territoire
// //               </div>
// //             </div>

// //             <div className="group">
// //               <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
// //                 19
// //               </div>
// //               <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
// //                 Rois dans la dynastie
// //               </div>
// //             </div>

// //             <div className="group">
// //               <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
// //                 99.5
// //               </div>
// //               <div className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-sm">
// //                 FM - Radio Émergent
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </section>

// //       {/* =================== HÉRITAGE ROYAL============================== */}

// //       <section className="py-24 lg:py-32 bg-slate-50">
// //         <div className="max-w-7xl mx-auto px-6">

// //           <div className="text-center mb-20">
// //             <div className="inline-flex items-center gap-3 text-yellow-600 font-bold mb-5 uppercase tracking-widest text-sm">
// //               <FaCrown className="text-lg" />
// //               <span>Héritage Royal</span>
// //             </div>
// //             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
// //               Une Dynastie au Service<br className="hidden md:block" /> de la Tradition
// //             </h2>
// //             <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
// //               Bangang est l'une des chefferies majeures des Bamboutos.
// //               Son histoire, transmise depuis plusieurs générations,
// //               demeure un pilier de l'identité Ngyemboon.
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">

// //             <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-500">
// //               <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-yellow-100 transition-all duration-500">
// //                 <FaCrown className="text-3xl text-yellow-500" />
// //               </div>
// //               <h3 className="text-2xl font-bold mb-4 text-slate-900">
// //                 Monarchie Traditionnelle
// //               </h3>
// //               <p className="text-slate-600 leading-relaxed">
// //                 Une institution ancestrale garante des valeurs,
// //                 de la cohésion sociale et de la transmission culturelle.
// //               </p>
// //             </div>

// //             <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-500">
// //               <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500">
// //                 <FaLandmark className="text-3xl text-blue-700" />
// //               </div>
// //               <h3 className="text-2xl font-bold mb-4 text-slate-900">
// //                 Patrimoine Historique
// //               </h3>
// //               <p className="text-slate-600 leading-relaxed">
// //                 Un riche héritage constitué de traditions,
// //                 de rites et d'une mémoire collective exceptionnelle.
// //               </p>
// //             </div>

// //             <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-500">
// //               <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-500">
// //                 <FaUsers className="text-3xl text-green-600" />
// //               </div>
// //               <h3 className="text-2xl font-bold mb-4 text-slate-900">
// //                 Peuple Uni
// //               </h3>
// //               <p className="text-slate-600 leading-relaxed">
// //                 Une communauté active qui contribue à la préservation
// //                 et au développement du royaume.
// //               </p>
// //             </div>

// //           </div>

// //         </div>
// //       </section>

// //     {/* Section Patrimoine avec effet parallaxe */}
// //       <HeritageSection />

// //       {/* ==================EXPLOIRATION=============================== */}

// //       <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32">

// //         <div className="text-center mb-16">
// //           <span className="uppercase tracking-[0.2em] text-blue-700 font-bold text-sm mb-4 block">
// //             Explorer
// //           </span>
// //           <h2 className="text-4xl md:text-5xl font-black text-slate-900">
// //             Plongez dans l'univers Bangang
// //           </h2>
// //         </div>

// //         <div className="grid md:grid-cols-3 gap-8">

// //           {/* HISTOIRE */}
// //           <Link href="/history" className="group block">
// //             <Card className="overflow-hidden h-full border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 group-hover:-translate-y-3 rounded-[2.5rem] bg-white">
// //               <div className="h-80 relative overflow-hidden">
// //                 <Image
// //                   src="/bams.jpg"
// //                   alt="Chefferie Bangang"
// //                   fill
// //                   className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //               </div>
// //               <div className="p-8 lg:p-10">
// //                 <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
// //                   Notre Histoire
// //                 </h3>
// //                 <p className="text-slate-600 leading-relaxed mb-6">
// //                   Découvrez l'origine, la fondation par Fouo Patouo et la prestigieuse dynastie des rois du royaume Ngyemboon.
// //                 </p>
// //                 <span className="inline-flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-4 transition-all duration-300">
// //                   En savoir plus <FaArrowRight className="w-4 h-4" />
// //                 </span>
// //               </div>
// //             </Card>
// //           </Link>

// //           {/* CULTURE */}
// //           <Link href="/culture" className="group block">
// //             <Card className="overflow-hidden h-full border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 group-hover:-translate-y-3 rounded-[2.5rem] bg-white">
// //               <div className="h-80 relative overflow-hidden">
// //                 <Image
// //                   src="/bams1.jpg"
// //                   alt="Culture Bangang"
// //                   fill
// //                   className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //               </div>
// //               <div className="p-8 lg:p-10">
// //                 <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
// //                   Culture & Patrimoine
// //                 </h3>
// //                 <p className="text-slate-600 leading-relaxed mb-6">
// //                   Chute de Mekoup, forêt sacrée, tenues royales et renaissance culturelle du royaume Bangang.
// //                 </p>
// //                 <span className="inline-flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-4 transition-all duration-300">
// //                   Explorer le patrimoine <FaArrowRight className="w-4 h-4" />
// //                 </span>
// //               </div>
// //             </Card>
// //           </Link>

// //           {/* NEWS */}
// //           <Link href="/news" className="group block">
// //             <Card className="overflow-hidden h-full border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 group-hover:-translate-y-3 rounded-[2.5rem] bg-white">
// //               <div className="h-80 relative overflow-hidden">
// //                 <Image
// //                   src="/bams3.jpg"
// //                   alt="Actualités Bangang"
// //                   fill
// //                   className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //               </div>
// //               <div className="p-8 lg:p-10">
// //                 <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
// //                   Actualités
// //                 </h3>
// //                 <p className="text-slate-600 leading-relaxed mb-6">
// //                   Reconstruction de la chefferie, musée royal et initiatives culturelles communautaires.
// //                 </p>
// //                 <span className="inline-flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-4 transition-all duration-300">
// //                   Voir les actualités <FaArrowRight className="w-4 h-4" />
// //                 </span>
// //               </div>
// //             </Card>
// //           </Link>

// //         </div>
// //       </section>

// //       {/* ==================PATRIMOINE NATUREL=============================== */}

// //       <section className="py-24 lg:py-32 bg-white">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

// //             <div className="order-2 lg:order-1">
// //               <span className="uppercase tracking-[0.3em] text-green-700 font-bold text-sm mb-4 block">
// //                 Patrimoine Naturel
// //               </span>
// //               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 mb-8 leading-tight">
// //                 Entre montagnes<br />et sites sacrés
// //               </h2>
// //               <p className="text-lg text-slate-600 leading-relaxed mb-12">
// //                 Situé au cœur des hauts plateaux de l'Ouest Cameroun,
// //                 Bangang possède un patrimoine naturel remarquable,
// //                 marqué par ses paysages, ses forêts et ses espaces sacrés.
// //               </p>

// //               <div className="space-y-8">
// //                 <div className="flex gap-6 group">
// //                   <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors duration-300">
// //                     <FaMountain className="text-2xl text-green-600" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-bold text-xl mb-2 text-slate-900">
// //                       Relief des Bamboutos
// //                     </h4>
// //                     <p className="text-slate-600 leading-relaxed">
// //                       Un environnement exceptionnel caractéristique des hauts plateaux.
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-6 group">
// //                   <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors duration-300">
// //                     <FaLeaf className="text-2xl text-green-600" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-bold text-xl mb-2 text-slate-900">
// //                       Forêts et espaces sacrés
// //                     </h4>
// //                     <p className="text-slate-600 leading-relaxed">
// //                       Des lieux de mémoire et de spiritualité préservés.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="order-1 lg:order-2 relative h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-300/40 group">
// //               <Image
// //                 src="/bams1.jpg"
// //                 alt="Patrimoine Bangang"
// //                 fill
// //                 className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
// //               />
// //               <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[3rem]" />
// //             </div>

// //           </div>
// //         </div>
// //       </section>

// //       {/* ====================VISION DU ROYAUME============================= */}

// //       <section className="py-28 lg:py-36 bg-slate-950 text-white relative overflow-hidden">

// //         {/* AMBIENT BACKGROUND */}
// //         <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-yellow-950/20" />
// //         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
// //         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px]" />

// //         <div className="relative max-w-5xl mx-auto px-6 text-center">

// //           <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-10 ring-1 ring-yellow-500/20">
// //             <FaGlobeAfrica className="text-5xl text-yellow-400" />
// //           </div>

// //           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
// //             Une Renaissance Culturelle<br />en Marche
// //           </h2>

// //           <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-3xl mx-auto">
// //             Sous l'impulsion des autorités traditionnelles et de la communauté,
// //             Bangang poursuit une dynamique de modernisation tout en préservant
// //             son identité culturelle et historique.
// //           </p>

// //           <Link
// //             href="/news"
// //             className="group inline-flex items-center gap-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 px-10 py-5 rounded-full font-bold text-lg transition-all duration-500 shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-1"
// //           >
// //             Découvrir les initiatives
// //             <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
// //           </Link>

// //         </div>
// //       </section>

// //       {/* ==================CTA FINAL=============================== */}

// //       <section className="py-24 lg:py-32 bg-white border-t border-slate-100">
// //         <div className="max-w-5xl mx-auto px-6 text-center">

// //           <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mx-auto mb-8">
// //             {/* <FaRadio className="text-4xl text-blue-700" /> */}
// //           </div>

// //           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
// //             Rejoignez la communauté<br />Bangang
// //           </h2>

// //           <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
// //             Suivez l'actualité du royaume, découvrez son histoire,
// //             son patrimoine et participez à sa valorisation.
// //           </p>

// //           <div className="flex flex-wrap justify-center gap-5">
// //             <Link
// //               href="/news"
// //               className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-blue-700/20"
// //             >
// //               Actualités
// //             </Link>

// //             <Link
// //               href="/culture"
// //               className="border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
// //             >
// //               Patrimoine Culturel
// //             </Link>
// //           </div>

// //         </div>
// //       </section>

// //     </main>
// //   );
// // }







































































































// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import HeritageSection from '@/components/sections/HeritageSection';

// // ─── Types ───────────────────────────────────────────────────
// interface StatItem { value: string; label: string; suffix?: string }
// interface CardItem { href: string; img: string; alt: string; tag: string; title: string; body: string; cta: string }
// interface PillarItem { icon: string; title: string; body: string; color: string }

// // ─── Data ────────────────────────────────────────────────────
// const STATS: StatItem[] = [
//   { value: '140', suffix: 'k', label: 'Habitants' },
//   { value: '134', suffix: ' km²', label: 'Territoire' },
//   { value: '19', label: 'Générations royales' },
//   { value: '99.5', suffix: ' FM', label: 'Radio Émergent' },
// ];

// const CARDS: CardItem[] = [
//   {
//     href: '/history',
//     img: '/bams.jpg',
//     alt: 'Chefferie Bangang',
//     tag: 'Histoire',
//     title: 'Notre Histoire',
//     body: 'Découvrez l\'origine, la fondation par Fouo Patouo et la prestigieuse lignée des rois du royaume Ngyemboon à travers les siècles.',
//     cta: 'Lire l\'histoire',
//   },
//   {
//     href: '/culture',
//     img: '/bams1.jpg',
//     alt: 'Culture Bangang',
//     tag: 'Patrimoine',
//     title: 'Culture & Héritage',
//     body: 'La chute de Mekoup, la forêt sacrée, les tenues royales et la renaissance culturelle d\'un royaume vivant.',
//     cta: 'Explorer',
//   },
//   {
//     href: '/news',
//     img: '/bams3.jpg',
//     alt: 'Actualités Bangang',
//     tag: 'Actualités',
//     title: 'Chroniques du Royaume',
//     body: 'Reconstruction de la chefferie, musée royal et initiatives communautaires qui façonnent le Bangang d\'aujourd\'hui.',
//     cta: 'Voir les nouvelles',
//   },
// ];

// const PILLARS: PillarItem[] = [
//   {
//     icon: '♛',
//     title: 'Monarchie Ancestrale',
//     body: 'Institution garante des valeurs, de la cohésion sociale et de la transmission de la mémoire collective du peuple Ngyemboon.',
//     color: '#C9A96E',
//   },
//   {
//     icon: '◈',
//     title: 'Patrimoine Vivant',
//     body: 'Un héritage constitué de rites, de traditions orales et d\'objets sacrés qui perpétuent l\'âme du royaume.',
//     color: '#7BA3A0',
//   },
//   {
//     icon: '⬡',
//     title: 'Peuple Uni',
//     body: 'Une communauté active qui œuvre à la préservation et au rayonnement du royaume bien au-delà des frontières.',
//     color: '#C9A96E',
//   },
// ];

// // ─── Sub-components ──────────────────────────────────────────

// function GrainOverlay() {
//   return (
//     <div
//       aria-hidden
//       style={{
//         position: 'fixed',
//         inset: 0,
//         zIndex: 9998,
//         pointerEvents: 'none',
//         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
//         backgroundRepeat: 'repeat',
//         backgroundSize: '180px 180px',
//         opacity: 0.6,
//         mixBlendMode: 'overlay',
//       }}
//     />
//   );
// }

// function HorizontalRule({ gold }: { gold?: boolean }) {
//   return (
//     <div
//       style={{
//         width: '100%',
//         height: 1,
//         background: gold
//           ? 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)'
//           : 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
//       }}
//     />
//   );
// }

// function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
//       <div style={{ width: 32, height: 1, background: light ? 'rgba(201,169,110,0.7)' : '#C9A96E' }} />
//       <span
//         style={{
//           fontFamily: '"DM Sans", sans-serif',
//           fontSize: 10,
//           fontWeight: 500,
//           letterSpacing: '0.28em',
//           textTransform: 'uppercase',
//           color: light ? 'rgba(201,169,110,0.85)' : '#C9A96E',
//         }}
//       >
//         {children}
//       </span>
//     </div>
//   );
// }

// // ─── Main Page ───────────────────────────────────────────────
// export default function HomePage() {
//   const heroRef = useRef<HTMLElement>(null);
//   const [scrollY, setScrollY] = useState(0);

//   // Parallax
//   useEffect(() => {
//     const onScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <>
//       <GrainOverlay />

//       <main
//         style={{
//           width: '100%',
//           overflowX: 'hidden',
//           background: '#F4F0E8',
//           fontFamily: '"DM Sans", sans-serif',
//         }}
//       >
//         {/* ══════════════════════════════════════════════════════
//             HERO — Immersive full-bleed cinematic opener
//         ══════════════════════════════════════════════════════ */}
//         <section
//           ref={heroRef}
//           style={{
//             position: 'relative',
//             width: '100%',
//             minHeight: '100vh',
//             overflow: 'hidden',
//             display: 'flex',
//             alignItems: 'flex-end',
//             paddingBottom: 'clamp(60px, 8vh, 100px)',
//           }}
//         >
//           {/* Parallax image */}
//           <div
//             style={{
//               position: 'absolute',
//               inset: '-10%',
//               transform: `translateY(${scrollY * 0.25}px)`,
//               willChange: 'transform',
//             }}
//           >
//             <Image
//               src="/roibangang.jpg"
//               alt="Royaume Bangang"
//               fill
//               priority
//               style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
//             />
//           </div>

//           {/* Multi-layer overlay for depth */}
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,4,2,0.88) 0%, rgba(12,10,6,0.60) 60%, rgba(12,10,6,0.35) 100%)' }} />
//           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,4,2,0.95) 0%, transparent 55%)' }} />

//           {/* Decorative — top right corner art deco mark */}
//           <div
//             aria-hidden
//             style={{
//               position: 'absolute',
//               top: 40,
//               right: 48,
//               width: 120,
//               height: 120,
//               border: '1px solid rgba(201,169,110,0.18)',
//               borderRadius: '50%',
//             }}
//           />
//           <div
//             aria-hidden
//             style={{
//               position: 'absolute',
//               top: 56,
//               right: 64,
//               width: 88,
//               height: 88,
//               border: '1px solid rgba(201,169,110,0.1)',
//               borderRadius: '50%',
//             }}
//           />

//           {/* Vertical left accent */}
//           <div
//             aria-hidden
//             style={{
//               position: 'absolute',
//               left: 40,
//               top: '15%',
//               bottom: '15%',
//               width: 1,
//               background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.3) 30%, rgba(201,169,110,0.3) 70%, transparent)',
//             }}
//           />

//           {/* Content */}
//           <div
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               width: '100%',
//               maxWidth: 1280,
//               margin: '0 auto',
//               padding: '0 clamp(24px, 6vw, 88px)',
//             }}
//           >
//             {/* Dynasty badge */}
//             <div
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: 10,
//                 marginBottom: 32,
//                 padding: '8px 18px',
//                 border: '1px solid rgba(201,169,110,0.3)',
//                 backdropFilter: 'blur(12px)',
//                 background: 'rgba(201,169,110,0.08)',
//               }}
//             >
//               <div
//                 style={{
//                   width: 6,
//                   height: 6,
//                   borderRadius: '50%',
//                   background: '#C9A96E',
//                   animation: 'heroPulse 2s ease-in-out infinite',
//                 }}
//               />
//               <span
//                 style={{
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 10,
//                   fontWeight: 500,
//                   letterSpacing: '0.3em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(201,169,110,0.9)',
//                 }}
//               >
//                 Royaume des Bamboutos · Fondé par Fouo Patouo
//               </span>
//             </div>

//             {/* Main headline */}
//             <h1
//               style={{
//                 fontFamily: '"Cormorant Garamond", serif',
//                 fontSize: 'clamp(56px, 10vw, 128px)',
//                 fontWeight: 700,
//                 lineHeight: 0.9,
//                 color: '#F5EDD8',
//                 letterSpacing: '-0.02em',
//                 marginBottom: 16,
//               }}
//             >
//               Bienvenue
//               <br />
//               <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>à Bangang</em>
//             </h1>

//             {/* Separator */}
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 16,
//                 marginBottom: 28,
//                 marginTop: 8,
//               }}
//             >
//               <div style={{ width: 64, height: 1, background: 'rgba(201,169,110,0.6)' }} />
//               <span
//                 style={{
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 11,
//                   letterSpacing: '0.25em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(201,169,110,0.6)',
//                 }}
//               >
//                 Ngyemboon
//               </span>
//               <div style={{ width: 64, height: 1, background: 'rgba(201,169,110,0.6)' }} />
//             </div>

//             {/* Sub-heading */}
//             <p
//               style={{
//                 fontFamily: '"Cormorant Garamond", serif',
//                 fontSize: 'clamp(18px, 2.5vw, 28px)',
//                 fontWeight: 400,
//                 fontStyle: 'italic',
//                 color: 'rgba(245,237,216,0.7)',
//                 marginBottom: 24,
//                 maxWidth: 540,
//                 lineHeight: 1.5,
//               }}
//             >
//               Un Royaume Atypique en Pleine Renaissance Culturelle
//             </p>

//             {/* Body text */}
//             <p
//               style={{
//                 fontFamily: '"DM Sans", sans-serif',
//                 fontSize: 'clamp(14px, 1.1vw, 16px)',
//                 fontWeight: 300,
//                 color: 'rgba(245,237,216,0.55)',
//                 maxWidth: 460,
//                 lineHeight: 1.9,
//                 marginBottom: 48,
//               }}
//             >
//               Terre d'histoire millénaire et de dynamisme communautaire, sous
//               le leadership de{' '}
//               <strong style={{ color: 'rgba(201,169,110,0.9)', fontWeight: 500 }}>
//                 S.M. Momo Keubou Serges Evariste
//               </strong>
//               , 19<sup>e</sup> Roi du Royaume Bangang.
//             </p>

//             {/* CTA buttons */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
//               <Link
//                 href="/history"
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: 12,
//                   padding: '16px 36px',
//                   background: '#C9A96E',
//                   color: '#0D0B07',
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 13,
//                   fontWeight: 600,
//                   letterSpacing: '0.12em',
//                   textTransform: 'uppercase',
//                   textDecoration: 'none',
//                   transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
//                 }}
//                 onMouseEnter={e => {
//                   (e.currentTarget as HTMLElement).style.background = '#DFC08A';
//                   (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
//                 }}
//                 onMouseLeave={e => {
//                   (e.currentTarget as HTMLElement).style.background = '#C9A96E';
//                   (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
//                 }}
//               >
//                 Découvrir l'Histoire
//                 <span style={{ fontSize: 16 }}>→</span>
//               </Link>

//               <Link
//                 href="/culture"
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: 12,
//                   padding: '16px 36px',
//                   background: 'transparent',
//                   border: '1px solid rgba(201,169,110,0.4)',
//                   color: '#F5EDD8',
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 13,
//                   fontWeight: 400,
//                   letterSpacing: '0.12em',
//                   textTransform: 'uppercase',
//                   textDecoration: 'none',
//                   transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
//                 }}
//                 onMouseEnter={e => {
//                   (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.8)';
//                   (e.currentTarget as HTMLElement).style.color = '#C9A96E';
//                 }}
//                 onMouseLeave={e => {
//                   (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.4)';
//                   (e.currentTarget as HTMLElement).style.color = '#F5EDD8';
//                 }}
//               >
//                 Explorer la Culture
//               </Link>
//             </div>
//           </div>

//           {/* Scroll indicator */}
//           <div
//             style={{
//               position: 'absolute',
//               bottom: 36,
//               right: 48,
//               zIndex: 20,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 8,
//             }}
//           >
//             <div
//               style={{
//                 writingMode: 'vertical-rl',
//                 textOrientation: 'mixed',
//                 transform: 'rotate(180deg)',
//                 fontFamily: '"DM Sans", sans-serif',
//                 fontSize: 9,
//                 letterSpacing: '0.25em',
//                 textTransform: 'uppercase',
//                 color: 'rgba(201,169,110,0.45)',
//                 marginBottom: 8,
//               }}
//             >
//               Défiler
//             </div>
//             <div
//               style={{
//                 width: 1,
//                 height: 48,
//                 background: 'rgba(201,169,110,0.2)',
//                 position: 'relative',
//                 overflow: 'hidden',
//               }}
//             >
//               <div style={{
//                 position: 'absolute',
//                 width: '100%',
//                 height: '40%',
//                 background: '#C9A96E',
//                 animation: 'scrollLine 2s ease-in-out infinite',
//               }} />
//             </div>
//           </div>

//           {/* Bottom fade to parchment */}
//           <div style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: 160,
//             background: 'linear-gradient(to top, #F4F0E8, transparent)',
//             zIndex: 5,
//           }} />
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             STATS — Floating numbers, parchment ground
//         ══════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             background: '#F4F0E8',
//             padding: 'clamp(48px, 8vh, 96px) clamp(24px, 6vw, 88px)',
//           }}
//         >
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '2px',
//                 background: 'rgba(201,169,110,0.15)',
//                 border: '1px solid rgba(201,169,110,0.2)',
//               }}
//             >
//               {STATS.map((s, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     background: '#F4F0E8',
//                     padding: '40px 36px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: 8,
//                     transition: 'background 0.3s',
//                   }}
//                   onMouseEnter={e => (e.currentTarget.style.background = '#EDE9DF')}
//                   onMouseLeave={e => (e.currentTarget.style.background = '#F4F0E8')}
//                 >
//                   <div
//                     style={{
//                       fontFamily: '"Cormorant Garamond", serif',
//                       fontSize: 'clamp(40px, 5vw, 60px)',
//                       fontWeight: 700,
//                       color: '#1A1712',
//                       lineHeight: 1,
//                     }}
//                   >
//                     {s.value}
//                     <span
//                       style={{
//                         fontSize: '0.45em',
//                         color: '#C9A96E',
//                         marginLeft: 2,
//                         fontWeight: 400,
//                       }}
//                     >
//                       {s.suffix}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       fontFamily: '"DM Sans", sans-serif',
//                       fontSize: 11,
//                       letterSpacing: '0.2em',
//                       textTransform: 'uppercase',
//                       color: 'rgba(26,23,18,0.45)',
//                       fontWeight: 400,
//                     }}
//                   >
//                     {s.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             PILLARS — 3 founding values, dark ground
//         ══════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             background: '#0D0B07',
//             padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 88px)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Ambient glow */}
//           <div aria-hidden style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%,-50%)',
//             width: 800,
//             height: 800,
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
//             pointerEvents: 'none',
//           }} />

//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <SectionLabel light>Héritage Royal</SectionLabel>

//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                 gap: 1,
//                 background: 'rgba(201,169,110,0.08)',
//                 marginTop: 40,
//               }}
//             >
//               {PILLARS.map((p, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     background: '#0D0B07',
//                     padding: '52px 40px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: 20,
//                     transition: 'background 0.4s',
//                     cursor: 'default',
//                   }}
//                   onMouseEnter={e => (e.currentTarget.style.background = '#13110B')}
//                   onMouseLeave={e => (e.currentTarget.style.background = '#0D0B07')}
//                 >
//                   <div
//                     style={{
//                       fontFamily: '"Cormorant Garamond", serif',
//                       fontSize: 32,
//                       color: '#C9A96E',
//                       lineHeight: 1,
//                     }}
//                   >
//                     {p.icon}
//                   </div>
//                   <h3
//                     style={{
//                       fontFamily: '"Cormorant Garamond", serif',
//                       fontSize: 22,
//                       fontWeight: 600,
//                       color: '#F5EDD8',
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     {p.title}
//                   </h3>
//                   <p
//                     style={{
//                       fontFamily: '"DM Sans", sans-serif',
//                       fontSize: 14,
//                       fontWeight: 300,
//                       color: 'rgba(245,237,216,0.45)',
//                       lineHeight: 1.85,
//                     }}
//                   >
//                     {p.body}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Dynasty headline under pillars */}
//             <div
//               style={{
//                 marginTop: 72,
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: 48,
//                 alignItems: 'center',
//               }}
//             >
//               <h2
//                 style={{
//                   fontFamily: '"Cormorant Garamond", serif',
//                   fontSize: 'clamp(32px, 4.5vw, 54px)',
//                   fontWeight: 700,
//                   fontStyle: 'italic',
//                   color: '#F5EDD8',
//                   lineHeight: 1.1,
//                   letterSpacing: '-0.01em',
//                 }}
//               >
//                 Une Dynastie au Service<br />de la Tradition
//               </h2>
//               <p
//                 style={{
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 'clamp(14px, 1.1vw, 16px)',
//                   fontWeight: 300,
//                   color: 'rgba(245,237,216,0.45)',
//                   lineHeight: 1.9,
//                 }}
//               >
//                 Bangang est l'une des chefferies majeures des Bamboutos. Son
//                 histoire, transmise depuis plusieurs générations, demeure un
//                 pilier de l'identité Ngyemboon et un modèle de gouvernance
//                 traditionnelle en Afrique centrale.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             HERITAGE — Scrolljack (imported component)
//         ══════════════════════════════════════════════════════ */}
//         <HeritageSection />

//         {/* ══════════════════════════════════════════════════════
//             EXPLORE CARDS — Three editorial cards
//         ══════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             background: '#F4F0E8',
//             padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 88px)',
//           }}
//         >
//           <div style={{ maxWidth: 1280, margin: '0 auto' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'flex-end',
//                 justifyContent: 'space-between',
//                 flexWrap: 'wrap',
//                 gap: 24,
//                 marginBottom: 56,
//               }}
//             >
//               <div>
//                 <SectionLabel>Explorer</SectionLabel>
//                 <h2
//                   style={{
//                     fontFamily: '"Cormorant Garamond", serif',
//                     fontSize: 'clamp(36px, 5vw, 60px)',
//                     fontWeight: 700,
//                     color: '#1A1712',
//                     lineHeight: 1,
//                     letterSpacing: '-0.02em',
//                   }}
//                 >
//                   Plongez dans<br />
//                   <em style={{ fontStyle: 'italic', color: '#6B5A3A' }}>l'univers Bangang</em>
//                 </h2>
//               </div>
//               <Link
//                 href="/culture"
//                 style={{
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 12,
//                   letterSpacing: '0.2em',
//                   textTransform: 'uppercase',
//                   color: '#C9A96E',
//                   textDecoration: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 8,
//                   borderBottom: '1px solid rgba(201,169,110,0.4)',
//                   paddingBottom: 2,
//                   transition: 'gap 0.3s',
//                 }}
//               >
//                 Tout explorer →
//               </Link>
//             </div>

//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//                 gap: 24,
//               }}
//             >
//               {CARDS.map((card, i) => (
//                 <Link
//                   key={i}
//                   href={card.href}
//                   style={{ textDecoration: 'none', display: 'block' }}
//                 >
//                   <article
//                     style={{
//                       background: '#EDE9DF',
//                       overflow: 'hidden',
//                       height: '100%',
//                       transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
//                       cursor: 'pointer',
//                     }}
//                     onMouseEnter={e => {
//                       (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
//                       const img = (e.currentTarget as HTMLElement).querySelector('.card-img') as HTMLElement;
//                       if (img) img.style.transform = 'scale(1.06)';
//                     }}
//                     onMouseLeave={e => {
//                       (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
//                       const img = (e.currentTarget as HTMLElement).querySelector('.card-img') as HTMLElement;
//                       if (img) img.style.transform = 'scale(1)';
//                     }}
//                   >
//                     {/* Image */}
//                     <div style={{ height: 280, position: 'relative', overflow: 'hidden' }}>
//                       <div
//                         className="card-img"
//                         style={{
//                           position: 'absolute',
//                           inset: 0,
//                           transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
//                         }}
//                       >
//                         <Image
//                           src={card.img}
//                           alt={card.alt}
//                           fill
//                           style={{ objectFit: 'cover' }}
//                         />
//                       </div>
//                       {/* Overlay */}
//                       <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         background: 'linear-gradient(to top, rgba(13,11,7,0.6) 0%, transparent 60%)',
//                       }} />
//                       {/* Tag */}
//                       <div
//                         style={{
//                           position: 'absolute',
//                           top: 20,
//                           left: 20,
//                           padding: '5px 12px',
//                           background: 'rgba(13,11,7,0.65)',
//                           backdropFilter: 'blur(8px)',
//                           fontFamily: '"DM Sans", sans-serif',
//                           fontSize: 9,
//                           letterSpacing: '0.22em',
//                           textTransform: 'uppercase',
//                           color: '#C9A96E',
//                         }}
//                       >
//                         {card.tag}
//                       </div>
//                     </div>

//                     {/* Body */}
//                     <div style={{ padding: '32px 28px 36px' }}>
//                       <h3
//                         style={{
//                           fontFamily: '"Cormorant Garamond", serif',
//                           fontSize: 26,
//                           fontWeight: 600,
//                           color: '#1A1712',
//                           marginBottom: 12,
//                           lineHeight: 1.15,
//                         }}
//                       >
//                         {card.title}
//                       </h3>
//                       <p
//                         style={{
//                           fontFamily: '"DM Sans", sans-serif',
//                           fontSize: 14,
//                           fontWeight: 300,
//                           color: 'rgba(26,23,18,0.55)',
//                           lineHeight: 1.8,
//                           marginBottom: 24,
//                         }}
//                       >
//                         {card.body}
//                       </p>
//                       <div
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 8,
//                           fontFamily: '"DM Sans", sans-serif',
//                           fontSize: 11,
//                           letterSpacing: '0.18em',
//                           textTransform: 'uppercase',
//                           color: '#C9A96E',
//                         }}
//                       >
//                         {card.cta}
//                         <span>→</span>
//                       </div>
//                     </div>
//                   </article>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             NATURE — Asymmetric two-column feature
//         ══════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             background: '#1A1712',
//             padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 88px)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           <HorizontalRule />

//           <div
//             style={{
//               maxWidth: 1280,
//               margin: '0 auto',
//               display: 'grid',
//               gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
//               gap: 'clamp(40px, 8vw, 120px)',
//               alignItems: 'center',
//               paddingTop: 'clamp(56px, 8vh, 96px)',
//             }}
//           >
//             {/* Left image block */}
//             <div style={{ position: 'relative' }}>
//               <div
//                 style={{
//                   position: 'relative',
//                   height: 'clamp(320px, 45vw, 580px)',
//                   overflow: 'hidden',
//                 }}
//               >
//                 <Image
//                   src="/bams1.jpg"
//                   alt="Patrimoine naturel Bangang"
//                   fill
//                   style={{
//                     objectFit: 'cover',
//                     filter: 'brightness(0.85) saturate(0.9)',
//                   }}
//                 />
//                 {/* Gold corner accent */}
//                 <div style={{
//                   position: 'absolute',
//                   bottom: -1,
//                   left: -1,
//                   width: 80,
//                   height: 80,
//                   borderBottom: '1px solid rgba(201,169,110,0.6)',
//                   borderLeft: '1px solid rgba(201,169,110,0.6)',
//                 }} />
//                 <div style={{
//                   position: 'absolute',
//                   top: -1,
//                   right: -1,
//                   width: 80,
//                   height: 80,
//                   borderTop: '1px solid rgba(201,169,110,0.6)',
//                   borderRight: '1px solid rgba(201,169,110,0.6)',
//                 }} />
//               </div>
//             </div>

//             {/* Right text */}
//             <div>
//               <SectionLabel light>Patrimoine Naturel</SectionLabel>

//               <h2
//                 style={{
//                   fontFamily: '"Cormorant Garamond", serif',
//                   fontSize: 'clamp(32px, 4vw, 52px)',
//                   fontWeight: 700,
//                   color: '#F5EDD8',
//                   lineHeight: 1.05,
//                   letterSpacing: '-0.01em',
//                   marginBottom: 24,
//                 }}
//               >
//                 Entre montagnes<br />
//                 <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>et sites sacrés</em>
//               </h2>

//               <p
//                 style={{
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 15,
//                   fontWeight: 300,
//                   color: 'rgba(245,237,216,0.5)',
//                   lineHeight: 1.9,
//                   marginBottom: 48,
//                 }}
//               >
//                 Au cœur des hauts plateaux de l'Ouest Cameroun, Bangang
//                 possède un patrimoine naturel remarquable — forêts d'altitude,
//                 cascades sacrées et paysages façonnés par des millénaires
//                 de présence humaine harmonieuse.
//               </p>

//               {/* Feature list */}
//               {[
//                 { title: 'Relief des Bamboutos', body: 'Un environnement d\'exception caractéristique des hauts plateaux avec le Mont Bamboutos à 2 740 m.' },
//                 { title: 'Forêts & espaces sacrés', body: 'Des lieux de mémoire et de spiritualité préservés depuis des générations de traditions orales.' },
//               ].map((f, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     display: 'flex',
//                     gap: 20,
//                     marginBottom: i === 0 ? 32 : 0,
//                     paddingBottom: i === 0 ? 32 : 0,
//                     borderBottom: i === 0 ? '1px solid rgba(201,169,110,0.1)' : 'none',
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 2,
//                       background: '#C9A96E',
//                       flexShrink: 0,
//                       opacity: 0.5,
//                     }}
//                   />
//                   <div>
//                     <h4
//                       style={{
//                         fontFamily: '"Cormorant Garamond", serif',
//                         fontSize: 18,
//                         fontWeight: 600,
//                         color: '#F5EDD8',
//                         marginBottom: 8,
//                       }}
//                     >
//                       {f.title}
//                     </h4>
//                     <p
//                       style={{
//                         fontFamily: '"DM Sans", sans-serif',
//                         fontSize: 13,
//                         fontWeight: 300,
//                         color: 'rgba(245,237,216,0.45)',
//                         lineHeight: 1.8,
//                       }}
//                     >
//                       {f.body}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             VISION — Full-bleed editorial CTA
//         ══════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             position: 'relative',
//             minHeight: 560,
//             overflow: 'hidden',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             textAlign: 'center',
//             padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 88px)',
//           }}
//         >
//           {/* Background image with heavy overlay */}
//           <div style={{ position: 'absolute', inset: 0 }}>
//             <Image
//               src="/roibangang.jpg"
//               alt=""
//               fill
//               style={{ objectFit: 'cover', filter: 'brightness(0.22) saturate(0.7)' }}
//               aria-hidden
//             />
//           </div>
//           <div style={{
//             position: 'absolute',
//             inset: 0,
//             background: 'rgba(13,11,7,0.7)',
//           }} />

//           {/* Decorative rings */}
//           {[280, 420, 560].map((size, i) => (
//             <div
//               key={i}
//               aria-hidden
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%,-50%)',
//                 width: size,
//                 height: size,
//                 borderRadius: '50%',
//                 border: `1px solid rgba(201,169,110,${0.06 - i * 0.015})`,
//                 pointerEvents: 'none',
//               }}
//             />
//           ))}

//           <div style={{ position: 'relative', zIndex: 10, maxWidth: 720 }}>
//             <div
//               style={{
//                 fontFamily: '"DM Sans", sans-serif',
//                 fontSize: 9,
//                 letterSpacing: '0.35em',
//                 textTransform: 'uppercase',
//                 color: 'rgba(201,169,110,0.6)',
//                 marginBottom: 24,
//               }}
//             >
//               ◈ &nbsp; Vision du Royaume &nbsp; ◈
//             </div>

//             <h2
//               style={{
//                 fontFamily: '"Cormorant Garamond", serif',
//                 fontSize: 'clamp(36px, 5.5vw, 68px)',
//                 fontWeight: 700,
//                 color: '#F5EDD8',
//                 lineHeight: 1.05,
//                 letterSpacing: '-0.015em',
//                 marginBottom: 20,
//               }}
//             >
//               Une Renaissance Culturelle<br />
//               <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>en Marche</em>
//             </h2>

//             <p
//               style={{
//                 fontFamily: '"DM Sans", sans-serif',
//                 fontSize: 15,
//                 fontWeight: 300,
//                 color: 'rgba(245,237,216,0.5)',
//                 lineHeight: 1.9,
//                 marginBottom: 44,
//               }}
//             >
//               Sous l'impulsion des autorités traditionnelles, Bangang poursuit
//               une dynamique de modernisation tout en préservant son identité
//               culturelle millénaire — un modèle unique en Afrique centrale.
//             </p>

//             <Link
//               href="/news"
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: 14,
//                 padding: '16px 40px',
//                 background: '#C9A96E',
//                 color: '#0D0B07',
//                 fontFamily: '"DM Sans", sans-serif',
//                 fontSize: 12,
//                 fontWeight: 600,
//                 letterSpacing: '0.18em',
//                 textTransform: 'uppercase',
//                 textDecoration: 'none',
//                 transition: 'all 0.4s',
//               }}
//               onMouseEnter={e => {
//                 (e.currentTarget as HTMLElement).style.background = '#DFC08A';
//                 (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
//               }}
//               onMouseLeave={e => {
//                 (e.currentTarget as HTMLElement).style.background = '#C9A96E';
//                 (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
//               }}
//             >
//               Découvrir les initiatives
//               <span style={{ fontSize: 16 }}>→</span>
//             </Link>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             FOOTER CTA — Parchment close
//         ══════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             background: '#F4F0E8',
//             borderTop: '1px solid rgba(201,169,110,0.2)',
//             padding: 'clamp(80px, 12vh, 120px) clamp(24px, 6vw, 88px)',
//           }}
//         >
//           <div
//             style={{
//               maxWidth: 860,
//               margin: '0 auto',
//               display: 'grid',
//               gridTemplateColumns: '1fr 1fr',
//               gap: 'clamp(40px, 6vw, 80px)',
//               alignItems: 'center',
//             }}
//           >
//             <div>
//               <h2
//                 style={{
//                   fontFamily: '"Cormorant Garamond", serif',
//                   fontSize: 'clamp(32px, 4.5vw, 52px)',
//                   fontWeight: 700,
//                   color: '#1A1712',
//                   lineHeight: 1.05,
//                   letterSpacing: '-0.015em',
//                   marginBottom: 16,
//                 }}
//               >
//                 Rejoignez la<br />
//                 <em style={{ fontStyle: 'italic', color: '#6B5A3A' }}>communauté Bangang</em>
//               </h2>
//               <p
//                 style={{
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 14,
//                   fontWeight: 300,
//                   color: 'rgba(26,23,18,0.5)',
//                   lineHeight: 1.85,
//                 }}
//               >
//                 Suivez l'actualité du royaume, découvrez son histoire,
//                 son patrimoine et participez à sa valorisation internationale.
//               </p>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//               <Link
//                 href="/news"
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   padding: '18px 24px',
//                   background: '#1A1712',
//                   color: '#F5EDD8',
//                   textDecoration: 'none',
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 12,
//                   letterSpacing: '0.15em',
//                   textTransform: 'uppercase',
//                   transition: 'background 0.3s',
//                 }}
//                 onMouseEnter={e => (e.currentTarget.style.background = '#2A2620')}
//                 onMouseLeave={e => (e.currentTarget.style.background = '#1A1712')}
//               >
//                 <span>Actualités du royaume</span>
//                 <span style={{ color: '#C9A96E' }}>→</span>
//               </Link>

//               <Link
//                 href="/culture"
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   padding: '18px 24px',
//                   background: 'transparent',
//                   border: '1px solid rgba(201,169,110,0.3)',
//                   color: '#1A1712',
//                   textDecoration: 'none',
//                   fontFamily: '"DM Sans", sans-serif',
//                   fontSize: 12,
//                   letterSpacing: '0.15em',
//                   textTransform: 'uppercase',
//                   transition: 'border-color 0.3s',
//                 }}
//                 onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.7)')}
//                 onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)')}
//               >
//                 <span>Patrimoine culturel</span>
//                 <span style={{ color: '#C9A96E' }}>→</span>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Global keyframes */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

//         @keyframes heroPulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.4; transform: scale(0.85); }
//         }

//         @keyframes scrollLine {
//           0% { top: -50%; opacity: 0; }
//           20% { opacity: 1; }
//           80% { opacity: 1; }
//           100% { top: 150%; opacity: 0; }
//         }
//       `}</style>
//     </>
//   );
// }









































'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GiCrown, GiAfrica, GiKingdom, GiFamilyHouse } from 'react-icons/gi';

import { 
  FiUsers, FiMapPin, FiRadio, FiCalendar, FiBriefcase, 
  FiMessageCircle, FiInfo, FiTrendingUp, FiHeart, FiGlobe,
  FiBookOpen, FiMusic, FiStar, FiShield, FiCrown, FiFeather,
  FiCompass, FiAward, FiCheckCircle, FiPlay, FiArrowRight,
  FiMail, FiPhone, FiClock
} from 'react-icons/fi';
import { FaCrown, FaLandmark, FaUsers, FaTree, FaWater, FaMountain } from 'react-icons/fa';
// import { GiCrown, GiAfrica, GiDiamondCrown, GiKingdom, GiFamilyHouse } from 'react-icons/gi';

// Chargement dynamique du composant HeritageSection
const HeritageSection = dynamic(
  () => import('@/components/sections/HeritageSection'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[60vh] bg-[#0D0B07] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
);

// ─── Types ───────────────────────────────────────────────────
interface StatItem { value: string; label: string; suffix?: string }
interface CardItem { href: string; img: string; alt: string; tag: string; title: string; body: string; cta: string }
interface PillarItem { icon: React.ReactNode; title: string; body: string }

// ─── Data ────────────────────────────────────────────────────
const STATS: StatItem[] = [
  { value: '140', suffix: 'k', label: 'Habitants' },
  { value: '134', suffix: ' km²', label: 'Territoire' },
  { value: '19', label: 'Générations royales' },
  { value: '99.5', suffix: ' FM', label: 'Radio Émergent' },
];

const CARDS: CardItem[] = [
  {
    href: '/history',
    img: '/bams.jpg',
    alt: 'Chefferie Bangang',
    tag: 'Histoire',
    title: 'Notre Histoire',
    body: 'Découvrez l\'origine, la fondation par Fouo Patouo et la prestigieuse lignée des rois du royaume Ngyemboon à travers les siècles.',
    cta: 'Lire l\'histoire',
  },
  {
    href: '/culture',
    img: '/bams1.jpg',
    alt: 'Culture Bangang',
    tag: 'Patrimoine',
    title: 'Culture & Héritage',
    body: 'La chute de Mekoup, la forêt sacrée, les tenues royales et la renaissance culturelle d\'un royaume vivant.',
    cta: 'Explorer',
  },
  {
    href: '/news',
    img: '/bams3.jpg',
    alt: 'Actualités Bangang',
    tag: 'Actualités',
    title: 'Chroniques du Royaume',
    body: 'Reconstruction de la chefferie, musée royal et initiatives communautaires qui façonnent le Bangang d\'aujourd\'hui.',
    cta: 'Voir les nouvelles',
  },
];

const PILLARS: PillarItem[] = [
  {
    icon: <GiCrown className="text-3xl text-[#C9A96E]" />,
    title: 'Monarchie Ancestrale',
    body: 'Institution garante des valeurs, de la cohésion sociale et de la transmission de la mémoire collective du peuple Ngyemboon.',
  },
  {
    icon: <FaLandmark className="text-3xl text-[#7BA3A0]" />,
    title: 'Patrimoine Vivant',
    body: 'Un héritage constitué de rites, de traditions orales et d\'objets sacrés qui perpétuent l\'âme du royaume.',
  },
  {
    icon: <FaUsers className="text-3xl text-[#C9A96E]" />,
    title: 'Peuple Uni',
    body: 'Une communauté active qui œuvre à la préservation et au rayonnement du royaume bien au-delà des frontières.',
  },
];

// ─── Composants ──────────────────────────────────────────

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

// ─── Main Page ───────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
        <section
          ref={heroRef}
          className="relative w-full min-h-screen flex items-end overflow-hidden pb-[clamp(60px,8vh,100px)]"
        >
          <div
            className="absolute inset-[-10%]"
            style={!isMobile ? { transform: `translateY(${scrollY * 0.25}px)` } : undefined}
          >
            <Image
              src="/roibangang.jpg"
              alt="Royaume Bangang"
              fill
              priority
              className="object-cover object-[center_30%]"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 pb-10">
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
                Royaume des Bamboutos · Fondé par Fouo Patouo
              </span>
            </div>

            <h1 className="font-serif text-[clamp(48px,10vw,128px)] font-bold leading-[0.9] text-[#F5EDD8] tracking-[-0.02em] mb-4">
              Bienvenue
              <br />
              <em className="italic text-[#C9A96E]">à Bangang</em>
            </h1>

            <div className="flex items-center gap-4 mb-7 mt-2">
              <div className="w-16 h-px bg-[#C9A96E]/60" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/60">
                Ngyemboon
              </span>
              <div className="w-16 h-px bg-[#C9A96E]/60" />
            </div>

            <p className="font-serif text-[clamp(16px,2.5vw,28px)] italic text-[#F5EDD8]/70 mb-6 max-w-[540px] leading-relaxed">
              Un Royaume Atypique en Pleine Renaissance Culturelle
            </p>

            <p className="font-sans text-[clamp(13px,1.1vw,16px)] font-light text-[#F5EDD8]/55 max-w-[460px] leading-relaxed mb-10 sm:mb-12">
              Terre d'histoire millénaire et de dynamisme communautaire, sous
              le leadership de{' '}
              <strong className="text-[#C9A96E]/90 font-medium">
                S.M. Momo Keubou Serges Evariste
              </strong>
              , 19<sup>e</sup> Roi du Royaume Bangang.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/history"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-9 sm:py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] active:scale-[0.98]"
              >
                Découvrir l'Histoire
                <span className="text-base">→</span>
              </Link>

              <Link
                href="/culture"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-9 sm:py-4 bg-transparent border border-[#C9A96E]/40 text-[#F5EDD8] font-sans text-xs sm:text-[13px] font-normal tracking-[0.12em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E]/80 hover:text-[#C9A96E] active:scale-[0.98]"
              >
                Explorer la Culture
              </Link>
            </div>
          </div>

          {!isMobile && (
            <div className="absolute bottom-9 right-12 z-20 flex flex-col items-center gap-2">
              <div className="writing-mode-vertical text-[9px] tracking-[0.25em] uppercase text-[#C9A96E]/45 mb-2">
                Défiler
              </div>
              <div className="w-px h-12 bg-[#C9A96E]/20 relative overflow-hidden">
                <div className="absolute w-full h-2/5 bg-[#C9A96E] animate-[scrollLine_2s_ease-in-out_infinite]" />
              </div>
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(48px,8vh,96px)] px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#C9A96E]/25 border border-[#C9A96E]/20">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="bg-[#F4F0E8] p-6 sm:p-10 flex flex-col gap-2 transition-colors duration-300 active:bg-[#EDE9DF]"
                >
                  <div className="font-serif text-[clamp(36px,5vw,60px)] font-bold text-[#1A1712] leading-none">
                    {s.value}
                    <span className="text-[0.45em] text-[#C9A96E] ml-0.5 font-normal">
                      {s.suffix}
                    </span>
                  </div>
                  <div className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#1A1712]/45 font-normal">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PILLARS
        ══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#0D0B07] py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#C9A96E]/5 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <SectionLabel light>Héritage Royal</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A96E]/15 mt-10">
              {PILLARS.map((p, i) => (
                <div
                  key={i}
                  className="bg-[#0D0B07] p-8 sm:p-12 flex flex-col gap-5 transition-colors duration-300 active:bg-[#13110B]"
                >
                  <div>{p.icon}</div>
                  <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-[#F5EDD8] leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[14px] font-light text-[#F5EDD8]/45 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 sm:mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
              <h2 className="font-serif text-[clamp(28px,4.5vw,54px)] font-bold italic text-[#F5EDD8] leading-tight tracking-[-0.01em]">
                Une Dynastie au Service<br />de la Tradition
              </h2>
              <p className="font-sans text-[clamp(13px,1.1vw,16px)] font-light text-[#F5EDD8]/45 leading-relaxed flex-1">
                Bangang est l'une des chefferies majeures des Bamboutos. Son
                histoire, transmise depuis plusieurs générations, demeure un
                pilier de l'identité Ngyemboon et un modèle de gouvernance
                traditionnelle en Afrique centrale.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            À PROPOS DE BANGANGCONNECT — AVEC ICÔNES RÉELLES
        ══════════════════════════════════════════════════════ */}
        <section className="py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 bg-gradient-to-br from-[#F4F0E8] to-[#EDE9DF] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-[#C9A96E]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <SectionLabel>À Découvrir</SectionLabel>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-bold text-[#1A1712] leading-tight tracking-[-0.02em]">
                À propos de{' '}
                <em className="italic text-[#C9A96E]">BangangConnect</em>
              </h2>
              <p className="font-sans text-[clamp(15px,1.2vw,18px)] font-light text-[#1A1712]/55 max-w-3xl mx-auto mt-4 leading-relaxed">
                La plateforme numérique qui connecte, informe et valorise la communauté Bangang
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
                  <Image
                    src="/banganglogo.png"
                    alt="BangangConnect Logo"
                    fill
                    className="object-cover bg-gradient-to-br from-[#1A1712] to-[#2A2620]"
                  />
                </div>
                <div className="absolute inset-0 border-2 border-[#C9A96E]/30 rounded-2xl pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#C9A96E]/40 rounded-br-2xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-[#C9A96E]/40 rounded-tl-2xl" />
              </div>

              <div>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-px bg-[#C9A96E]" />
                    <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] font-medium">
                      Pourquoi BangangConnect ?
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1712] mb-4 leading-tight">
                    Une plateforme <span className="text-[#C9A96E]">communautaire</span> unique
                  </h3>
                </div>

                <div className="space-y-6 text-[#1A1712]/70">
                  <p className="font-sans text-[15px] leading-relaxed">
                    <strong className="text-[#1A1712] font-semibold">BangangConnect</strong> est la première plateforme numérique dédiée exclusivement à la communauté Bangang.
                    Notre mission est de fédérer, d'informer et de promouvoir le patrimoine exceptionnel du royaume.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    {[
                      { icon: <FiBookOpen className="text-2xl text-[#C9A96E]" />, title: 'Actualités', desc: 'Suivez la vie du royaume en temps réel' },
                      { icon: <FiBriefcase className="text-2xl text-[#C9A96E]" />, title: 'Annuaire Économique', desc: 'Valorisez les entrepreneurs Bangang' },
                      { icon: <FiMessageCircle className="text-2xl text-[#C9A96E]" />, title: 'Chat Communautaire', desc: 'Échangez avec votre secteur' },
                      { icon: <FiCalendar className="text-2xl text-[#C9A96E]" />, title: 'Événements', desc: 'Participez à la vie culturelle' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#C9A96E]/10 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1A1712] text-sm">{item.title}</h4>
                          <p className="text-xs text-[#1A1712]/50">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#C9A96E]/10">
                    <p className="font-sans text-[14px] italic leading-relaxed text-[#C9A96E]/80">
                      « Ensemble, construisons le numérique au service de notre identité et de notre développement. »
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-white font-sans text-[12px] font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] hover:gap-3 active:scale-[0.98]"
                      >
                        En savoir plus
                        <FiArrowRight size={14} />
                      </Link>
                      <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#C9A96E]/40 text-[#1A1712] font-sans text-[12px] font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-300 hover:border-[#C9A96E] hover:gap-3 active:scale-[0.98]"
                      >
                        Rejoindre
                        <FiArrowRight size={14} />
                      </Link>
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
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-3 group-hover:bg-[#C9A96E]/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C9A96E]">{item.value}</div>
                  <div className="font-sans text-[11px] tracking-[0.1em] uppercase text-[#1A1712]/50 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HERITAGE
        ══════════════════════════════════════════════════════ */}
        <HeritageSection />

        {/* ══════════════════════════════════════════════════════
            EXPLORE CARDS
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#F4F0E8] py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <SectionLabel>Explorer</SectionLabel>
                <h2 className="font-serif text-[clamp(32px,5vw,60px)] font-bold text-[#1A1712] leading-tight tracking-[-0.02em]">
                  Plongez dans<br />
                  <em className="italic text-[#6B5A3A]">l'univers Bangang</em>
                </h2>
              </div>
              <Link
                href="/culture"
                className="font-sans text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-[#C9A96E] no-underline flex items-center gap-2 pb-0.5 border-b border-[#C9A96E]/40 transition-all duration-300 hover:gap-3"
              >
                Tout explorer <FiArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CARDS.map((card, i) => (
                <Link key={i} href={card.href} className="no-underline block group">
                  <article className="bg-[#EDE9DF] overflow-hidden h-full transition-all duration-500 active:scale-[0.98]">
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <Image
                          src={card.img}
                          alt={card.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/65 backdrop-blur-md font-sans text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#C9A96E]">
                        {card.tag}
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 md:p-8">
                      <h3 className="font-serif text-2xl sm:text-[26px] font-semibold text-[#1A1712] mb-3 leading-tight">
                        {card.title}
                      </h3>
                      <p className="font-sans text-[13px] sm:text-[14px] font-light text-[#1A1712]/55 leading-relaxed mb-6">
                        {card.body}
                      </p>
                      <div className="flex items-center gap-2 font-sans text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#C9A96E]">
                        {card.cta}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            NATURE
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#1A1712] py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-[clamp(40px,8vw,120px)] items-center">
              <div className="relative w-full lg:w-1/2">
                <div className="relative h-[320px] sm:h-[420px] lg:h-[580px] overflow-hidden rounded-2xl">
                  <Image
                    src="/bams1.jpg"
                    alt="Patrimoine naturel Bangang"
                    fill
                    className="object-cover brightness-90 saturate-90"
                  />
                  <div className="absolute -bottom-px -left-px w-16 h-16 border-b border-l border-[#C9A96E]/60" />
                  <div className="absolute -top-px -right-px w-16 h-16 border-t border-r border-[#C9A96E]/60" />
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <SectionLabel light>Patrimoine Naturel</SectionLabel>

                <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-bold text-[#F5EDD8] leading-tight tracking-[-0.01em] mb-6">
                  Entre montagnes<br />
                  <em className="italic text-[#C9A96E]">et sites sacrés</em>
                </h2>

                <p className="font-sans text-[14px] sm:text-[15px] font-light text-[#F5EDD8]/50 leading-relaxed mb-10 lg:mb-12">
                  Au cœur des hauts plateaux de l'Ouest Cameroun, Bangang
                  possède un patrimoine naturel remarquable — forêts d'altitude,
                  cascades sacrées et paysages façonnés par des millénaires
                  de présence humaine harmonieuse.
                </p>

                {[
                  { title: 'Relief des Bamboutos', body: 'Un environnement d\'exception caractéristique des hauts plateaux avec le Mont Bamboutos à 2 740 m.', icon: <FaMountain className="text-[#C9A96E]" /> },
                  { title: 'Forêts & espaces sacrés', body: 'Des lieux de mémoire et de spiritualité préservés depuis des générations de traditions orales.', icon: <FaTree className="text-[#C9A96E]" /> },
                ].map((f, i) => (
                  <div
                    key={i}
                    className={`flex gap-5 ${i === 0 ? 'pb-8 mb-8 border-b border-[#C9A96E]/10' : ''}`}
                  >
                    <div className="w-px bg-[#C9A96E]/50 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {f.icon}
                        <h4 className="font-serif text-lg font-semibold text-[#F5EDD8]">
                          {f.title}
                        </h4>
                      </div>
                      <p className="font-sans text-[13px] font-light text-[#F5EDD8]/45 leading-relaxed">
                        {f.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            VISION — Version améliorée sans cercles
        ══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[500px] flex items-center justify-center text-center py-[clamp(60px,12vh,140px)] px-5 sm:px-8 lg:px-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/roibangang.jpg"
              alt=""
              fill
              className="object-cover brightness-[0.25] saturate-70"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-black/70" />

          {/* Décoration épurée - sans cercles */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30" />

          <div className="relative z-10 max-w-3xl px-4">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
              <GiCrown className="text-[#C9A96E] text-sm" />
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A96E]/80">
                Vision du Royaume
              </span>
            </div>

            <h2 className="font-serif text-[clamp(32px,5.5vw,68px)] font-bold text-[#F5EDD8] leading-tight tracking-[-0.015em] mb-5">
              Une Renaissance Culturelle<br />
              <em className="text-[#C9A96E] italic">en Marche</em>
            </h2>

            <p className="font-sans text-[14px] sm:text-[15px] font-light text-[#F5EDD8]/50 leading-relaxed mb-10 max-w-2xl mx-auto">
              Sous l'impulsion des autorités traditionnelles, Bangang poursuit
              une dynamique de modernisation tout en préservant son identité
              culturelle millénaire — un modèle unique en Afrique centrale.
            </p>

            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 bg-[#C9A96E] text-[#0D0B07] font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase rounded-full transition-all duration-300 hover:bg-[#DFC08A] hover:gap-4 active:scale-[0.98]"
            >
              Découvrir les initiatives
              <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30" />
        </section>

        {/* ══════════════════════════════════════════════════════
            FOOTER CTA
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#F4F0E8] border-t border-[#C9A96E]/20 py-[clamp(60px,12vh,120px)] px-5 sm:px-8 lg:px-20">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center text-center lg:text-left">
            <div className="lg:flex-1">
              <h2 className="font-serif text-[clamp(28px,4.5vw,52px)] font-bold text-[#1A1712] leading-tight tracking-[-0.015em] mb-4">
                Rejoignez la<br />
                <em className="italic text-[#6B5A3A]">communauté Bangang</em>
              </h2>
              <p className="font-sans text-[13px] sm:text-[14px] font-light text-[#1A1712]/50 leading-relaxed">
                Suivez l'actualité du royaume, découvrez son histoire,
                son patrimoine et participez à sa valorisation internationale.
              </p>
            </div>

            <div className="lg:flex-1 flex flex-col gap-4 w-full">
              <Link
                href="/news"
                className="flex items-center justify-between px-6 py-4 bg-[#1A1712] text-[#F5EDD8] no-underline font-sans text-[11px] sm:text-[12px] tracking-[0.15em] uppercase rounded-xl transition-all duration-300 hover:bg-[#2A2620] hover:px-8 active:scale-[0.98]"
              >
                <span>Actualités du royaume</span>
                <FiArrowRight className="text-[#C9A96E]" />
              </Link>

              <Link
                href="/culture"
                className="flex items-center justify-between px-6 py-4 bg-transparent border border-[#C9A96E]/30 text-[#1A1712] no-underline font-sans text-[11px] sm:text-[12px] tracking-[0.15em] uppercase rounded-xl transition-all duration-300 hover:border-[#C9A96E]/70 hover:px-8 active:scale-[0.98]"
              >
                <span>Patrimoine culturel</span>
                <FiArrowRight className="text-[#C9A96E]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes scrollLine {
          0% { top: -50%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 150%; opacity: 0; }
        }
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
        }
      `}</style>
    </>
  );
}