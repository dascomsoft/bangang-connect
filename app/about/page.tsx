import {
  FaGlobeAfrica,
  FaUsers,
  FaComments,
  FaCalendarAlt,
  FaBriefcase,
  FaBullhorn,
  FaHandshake,
  FaRocket,
  FaArrowRight,
  FaChartLine,
  FaLightbulb,
  FaShieldAlt,
  FaNetworkWired,
} from 'react-icons/fa';

export default function AboutBangangConnect() {
  const stats = [
    { value: '10+', label: 'Régions du Cameroun' },
    { value: '5+', label: 'Pays de la diaspora' },
    { value: '24/7', label: 'Connexion communautaire' },
    { value: '100%', label: 'Vision communautaire' },
  ];

  const features = [
    {
      title: 'Communautés & Secteurs',
      desc: 'Organisation intelligente des membres par communautés, villes, pays et secteurs afin de faciliter les échanges et les rencontres.',
      icon: FaGlobeAfrica,
    },
    {
      title: 'Chat Temps Réel',
      desc: 'Messagerie instantanée avec Socket.io pour permettre une communication fluide entre les membres.',
      icon: FaComments,
    },
    {
      title: 'Événements & Réunions',
      desc: 'Création et gestion des événements communautaires avec système de participation et boost.',
      icon: FaCalendarAlt,
    },
    {
      title: 'Espace Économique',
      desc: 'Promotion des entrepreneurs Bangang, annonces professionnelles, opportunités et réseautage.',
      icon: FaBriefcase,
    },
  ];


const values = [
  {
    title: (
      <div className="flex items-center gap-3">
        <FaUsers className="text-green-300" />
        Unité
      </div>
    ),
    desc: "Rassembler tous les fils et filles Bangang autour d’une plateforme moderne et collaborative.",
  },
  {
    title: (
      <div className="flex items-center gap-3">
        <FaHandshake className="text-green-300" />
        Solidarité
      </div>
    ),
    desc: "Favoriser l’entraide, le partage et le soutien entre les membres de la communauté.",
  },
  {
    title: (
      <div className="flex items-center gap-3">
        <FaLightbulb className="text-green-300" />
        Innovation
      </div>
    ),
    desc: "Utiliser les technologies modernes pour développer et connecter la diaspora Bangang.",
  },
  {
    title: (
      <div className="flex items-center gap-3">
        <FaRocket className="text-green-300" />
        Développement
      </div>
    ),
    desc: "Créer un impact économique et social positif à travers le numérique.",
  },
];

  return (
    <main className="bg-white text-gray-900 overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_white,_transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center py-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-sm">
              <FaGlobeAfrica className="text-lg" /> Plateforme Communautaire Bangang
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Connecter la diaspora Bangang à travers le monde.
            </h1>

            <p className="text-lg md:text-xl text-green-50 leading-relaxed max-w-2xl mb-8">
              Bangang Connect est une plateforme communautaire moderne conçue pour rapprocher les fils et filles Bangang du Cameroun et de la diaspora grâce à la communication, la collaboration et l’innovation numérique.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-green-700 px-7 py-4 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition">
                <span className="flex items-center gap-2">Rejoindre la communauté <FaArrowRight /></span>
              </button>

              <button className="border border-white/40 px-7 py-4 rounded-2xl font-semibold hover:bg-white/10 transition">
                <span className="flex items-center gap-2">Explorer la plateforme <FaArrowRight /></span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-5">
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <h3 className="text-4xl font-black mb-2">{item.value}</h3>
                    <p className="text-green-100 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white/10 rounded-2xl p-5 border border-white/10">
                <p className="text-sm uppercase tracking-widest text-green-100 mb-2">
                  Vision
                </p>
                <p className="text-lg leading-relaxed">
                  Construire un écosystème numérique communautaire permettant aux Bangang du monde entier de communiquer, collaborer, entreprendre et grandir ensemble.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-green-700 font-bold uppercase tracking-[0.3em] text-sm">
              À propos
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
              Une plateforme pensée pour l’unité et le développement de la communauté Bangang.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mt-8">
              Bangang Connect est née d’un besoin réel : rapprocher les membres de la communauté Bangang dispersés entre le Cameroun et la diaspora internationale.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mt-5">
              Grâce à une infrastructure moderne basée sur Next.js, MongoDB et Socket.io, la plateforme facilite les échanges, l’organisation des événements, le réseautage économique et la collaboration communautaire.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-xl mb-2">🌍 Diaspora Connectée</h3>
                <p className="text-gray-600">
                  Relier les Bangang du Cameroun, d’Europe, d’Amérique et d’ailleurs.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-xl mb-2">🚀 Technologie Moderne</h3>
                <p className="text-gray-600">
                  Une expérience rapide, fluide et responsive sur mobile et desktop.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-[2rem] p-10 shadow-xl">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-black text-2xl mb-2"><FaComments className="inline mr-2 text-green-700" /> Communication</h3>
                  <p className="text-gray-600">
                    Chats communautaires et échanges en temps réel.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-black text-2xl mb-2"><FaCalendarAlt className="inline mr-2 text-green-700" /> Organisation</h3>
                  <p className="text-gray-600">
                    Gestion des secteurs, événements et réunions.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-black text-2xl mb-2"><FaBriefcase className="inline mr-2 text-green-700" /> Opportunités</h3>
                  <p className="text-gray-600">
                    Promotion des activités économiques et mise en relation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-green-700 font-bold uppercase tracking-[0.3em] text-sm">
              Fonctionnalités
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-4">
              Une expérience communautaire complète.
            </h2>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Bangang Connect combine réseau social, communication temps réel, organisation communautaire et développement économique dans une seule plateforme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-6 text-green-700">
                  <feature.icon />
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECONOMY */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="bg-gradient-to-br from-green-700 to-teal-700 text-white rounded-[2rem] p-10 shadow-2xl">
            <span className="uppercase tracking-[0.3em] text-sm text-green-100 font-semibold">
              Espace économique
            </span>

            <h2 className="text-4xl font-black mt-5 leading-tight">
              Développer l’économie Bangang grâce au numérique.
            </h2>

            <p className="text-green-50 text-lg mt-6 leading-relaxed">
              La plateforme intègre un espace dédié aux entrepreneurs, commerçants, freelances et investisseurs afin de créer un véritable réseau économique communautaire.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl">
                <span className="text-2xl"><FaBullhorn className="text-2xl" /></span>
                <div>
                  <h3 className="font-bold">Publicité & visibilité</h3>
                  <p className="text-green-100 text-sm">
                    Mise en avant des activités économiques Bangang.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl">
                <span className="text-2xl"><FaHandshake className="text-2xl" /></span>
                <div>
                  <h3 className="font-bold">Réseautage</h3>
                  <p className="text-green-100 text-sm">
                    Connexion entre entrepreneurs et partenaires.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl">
                <span className="text-2xl"><FaBriefcase className="text-2xl" /></span>
                <div>
                  <h3 className="font-bold">Opportunités d’emploi</h3>
                  <p className="text-green-100 text-sm">
                    Création d’opportunités pour la jeunesse et la diaspora.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Plus qu’un réseau social.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mt-8">
              Bangang Connect ambitionne de devenir une véritable infrastructure numérique communautaire capable de soutenir les initiatives locales, les projets économiques et les collaborations internationales.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-l-4 border-green-600 pl-5">
                <h3 className="font-black text-xl"><FaChartLine className="inline mr-2 text-green-700" /> Développement local</h3>
                <p className="text-gray-600 mt-2">
                  Encourager les investissements et initiatives communautaires.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-5">
                <h3 className="font-black text-xl"><FaNetworkWired className="inline mr-2 text-green-700" /> Réseau mondial</h3>
                <p className="text-gray-600 mt-2">
                  Créer des connexions fortes entre le Cameroun et la diaspora.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-5">
                <h3 className="font-black text-xl"><FaRocket className="inline mr-2 text-green-700" /> Innovation communautaire</h3>
                <p className="text-gray-600 mt-2">
                  Utiliser la technologie pour moderniser les échanges communautaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-28 bg-gray-950 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-green-400 font-bold uppercase tracking-[0.3em] text-sm">
              Nos valeurs
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-4">
              Les fondations de Bangang Connect.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-black mb-4 text-green-300">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-700 to-teal-700 rounded-[2.5rem] p-12 md:p-16 text-white text-center shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Rejoignez l’avenir numérique de la communauté Bangang.
          </h2>

          <p className="text-lg text-green-100 max-w-3xl mx-auto mt-8 leading-relaxed">
            Connectez-vous, échangez, participez aux événements, développez votre réseau et contribuez à la croissance de la communauté Bangang partout dans le monde.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
              <span className="flex items-center gap-2">Créer un compte <FaArrowRight /></span>
            </button>

            <button className="border border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition">
              <span className="flex items-center gap-2">Découvrir les communautés <FaArrowRight /></span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
