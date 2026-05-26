'use client';

import Image from 'next/image';
import Card from '@/components/ui/Card';

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
  FaCrown
} from 'react-icons/fa';

const newsItems = [
  {
    id: 1,
    title: "Radio Bangang Émergent (99,5 FM)",
    date: "Lancée en juin 2020",
    description:
      "La voix officielle de la communauté. Émissions culturelles, débats de développement, journaux et musique en français et en langue Ngyemboon.",
    icon: FaBroadcastTower,
    color: "text-red-600",
    image: "/bams1.jpg"
  },
  {
    id: 2,
    title: "Reconstruction de la Chefferie Royale",
    date: "En cours",
    description:
      "Chantier majeur du règne actuel, symbole de la grandeur retrouvée du royaume.",
    icon: FaUniversity,
    color: "text-blue-600",
    image: "/Entrée-palais-royal-Bangang.jpg"
  },
  {
    id: 3,
    title: "Projet de Musée des Arts et de la Culture",
    date: "En préparation",
    description:
      "Sauvegarde et transmission du patrimoine culturel aux générations futures.",
    icon: FaLandmark,
    color: "text-purple-600",
    image: "/roibangang.jpg"
  },
  {
    id: 4,
    title: "Mobilisation de la diaspora",
    date: "Continue",
    description:
      "Renforcement des liens avec les communautés Bangang dans le monde entier.",
    icon: FaUsers,
    color: "text-green-600",
    image: "/roibangang1.jpg"
  }
];

const initiatives = [
  {
    icon: FaLeaf,
    title: "Agriculture durable",
    desc: "Autosuffisance alimentaire et innovation agricole"
  },
  {
    icon: FaMountain,
    title: "Écotourisme",
    desc: "Valorisation des sites naturels et culturels"
  },
  {
    icon: FaBriefcase,
    title: "Investissements",
    desc: "Appel aux opérateurs économiques"
  }
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

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= HERO ULTRA ================= */}
      <section
        className="relative h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/bams3.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        <div className="relative container mx-auto px-6 h-full flex items-center">

          <div className="text-white max-w-4xl">

            <div className="flex items-center gap-3 text-blue-300 mb-4">
              <FaMicrophoneAlt className="text-2xl" />
              <span className="uppercase tracking-[0.4em] text-sm">
                Actualités communautaires
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Actualités Bangang
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl">
              Informations communautaires en temps réel
            </p>

            <p className="text-gray-300 mt-6 max-w-3xl">
              Restez connecté à la vie du groupement Bangang : initiatives royales,
              projets de développement, événements culturels et opportunités communautaires.
            </p>

          </div>

        </div>
      </section>

      {/* ================= A LA UNE ================= */}
      <section className="py-24 container mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          À la Une
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {newsItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition">

                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    <Icon className={item.color} />
                    {item.date}
                  </div>
                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>

                  <button className="text-blue-600 font-semibold hover:text-blue-800">
                    Lire la suite →
                  </button>

                </div>

              </Card>
            );
          })}

        </div>

      </section>

      {/* ================= RADIO ================= */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center gap-4">
            <FaBroadcastTower className="text-4xl" />
            <div>
              <h3 className="text-2xl font-bold">Radio Bangang Émergent</h3>
              <p className="text-blue-100">99.5 FM - Voix de la communauté</p>
            </div>
          </div>

          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
            Écouter en direct
          </button>

        </div>

      </section>

      {/* ================= INITIATIVES ================= */}
      <section className="py-24 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-12">
          Engagement communautaire
        </h2>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">

          {initiatives.map((item, i) => {
            const Icon = item.icon;

            return (
              <div key={i} className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-lg transition">

                <Icon className="text-4xl text-green-600 mx-auto mb-4" />

                <h3 className="font-bold mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* ================= PERSONNALITES ================= */}
      <section className="py-24 container mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Élites communautaires
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {personalities.map((p, i) => (
            <Card key={i} className="p-6 text-center hover:shadow-xl transition">

              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                {p.name.charAt(0)}
              </div>

              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-blue-600 mb-3">{p.role}</p>
              <p className="text-gray-600 italic text-sm">"{p.quote}"</p>

            </Card>
          ))}

        </div>

      </section>

      {/* ================= MESSAGE ROI ================= */}
      <section className="py-24 bg-amber-50 text-center">

        <FaCrown className="text-4xl mx-auto mb-4 text-amber-600" />

        <h2 className="text-2xl font-bold mb-4">
          Message de Sa Majesté
        </h2>

        <p className="text-xl italic max-w-3xl mx-auto text-gray-700">
          « Nous travaillons la main dans la main pour un Bangang émergent, fier de ses racines et tourné vers l'avenir. »
        </p>

        <p className="mt-4 text-gray-600">
          S.M. Momo Keubou Serges Evariste
        </p>

      </section>

    </div>
  );
}