'use client';

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";

import {
  FaLandmark,
  FaWater,
  FaMusic,
  FaUniversity,
  FaCrown,
  FaBroadcastTower
} from "react-icons/fa";

import { GiAfrica } from "react-icons/gi";

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/mekoup.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-5xl">

            <div className="flex items-center gap-3 text-green-300 mb-4">
              <GiAfrica className="text-2xl" />
              <span className="uppercase tracking-[0.35em] text-sm">
                Patrimoine culturel & spirituel
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black">
              Culture Bangang
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-3xl">
              Un patrimoine vivant, mystique et en pleine renaissance
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                href="#patrimoine"
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl transition font-semibold"
              >
                Explorer le patrimoine
              </Link>

              <Link
                href="/histoire"
                className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Voir l’histoire
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-24 container mx-auto px-6 max-w-4xl text-center">

        <FaLandmark className="text-4xl text-green-600 mx-auto mb-6" />

        <p className="text-lg text-gray-700 leading-relaxed">
          La culture Bangang est riche, spirituelle et profondément ancrée dans les traditions Ngyemboon.
          Elle constitue le socle de l’identité du peuple et se manifeste à travers ses sites sacrés,
          ses rites, ses arts et son organisation sociale.
        </p>

      </section>

      {/* ================= SITES SACRES ================= */}
      <section id="patrimoine" className="bg-gray-50 py-24">

        <div className="text-center mb-16">
          <FaWater className="text-4xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">
            Hauts lieux du patrimoine culturel
          </h2>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">

          {/* MEKOUP */}
          <Card className="overflow-hidden group">
            <div className="relative h-72">
              <Image
                src="/mekoup1.jpg"
                alt="Chute de Mekoup"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                La Chute de Mekoup
              </h3>

              <p className="text-gray-700 mb-4">
                Située à environ 8 km du palais royal, cette chute majestueuse d’environ
                <strong> 200 mètres de hauteur</strong> est l’un des sites les plus emblématiques de l’Ouest Cameroun.
              </p>

              <ul className="text-sm text-gray-600 space-y-1">
                <li>Forêt sacrée protégée depuis des siècles</li>
                <li>Lieu de culte et de pèlerinage</li>
                <li>Sacrifices et bénédictions aux ancêtres</li>
              </ul>
            </div>
          </Card>

          {/* MEPIBUEA */}
          <Card className="overflow-hidden group">
            <div className="relative h-72">
              <Image
                src="/Mepibwa-Bangang.jpg"
                alt="Chutes jumelles de Mepibuea"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                Chutes jumelles de Mepibuea
              </h3>

              <p className="text-gray-700">
                Lieu sacré aux vertus spirituelles particulières, symbolisant la dualité et la fertilité.
              </p>
            </div>
          </Card>

        </div>
      </section>

      {/* ================= CHEFFERIE ================= */}
      <section className="grid md:grid-cols-2 gap-12 items-center py-24 px-6">

        <div>
          <FaUniversity className="text-4xl text-green-600 mb-4" />

          <h2 className="text-3xl font-bold mb-4">
            La Chefferie Royale
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Cœur spirituel et administratif du groupement, actuellement en reconstruction et modernisation.
          </p>
        </div>

        <div className="relative h-80 rounded-2xl overflow-hidden">
          <Image
            src="/Entrée-palais-royal-Bangang.jpg"
            alt="Chefferie royale"
            fill
            className="object-cover"
          />
        </div>

      </section>

      {/* ================= PATRIMOINE IMMATERIEL ================= */}
      <section className="py-24 bg-gray-50">

        <div className="text-center mb-12">
          <FaMusic className="text-4xl text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">
            Patrimoine immatériel
          </h2>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
            <h3 className="font-bold">Danses & musiques</h3>
            <p className="text-sm text-gray-600 mt-2">Rythmes ancestraux et cérémonies royales</p>
          </div>

          <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
            <h3 className="font-bold">Rites traditionnels</h3>
            <p className="text-sm text-gray-600 mt-2">Initiations et funérailles royales</p>
          </div>

          <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
            <h3 className="font-bold">Sagesse orale</h3>
            <p className="text-sm text-gray-600 mt-2">Proverbes et transmission Ngyemboon</p>
          </div>

          <div className="p-6 bg-white rounded-2xl text-center shadow-sm">
            <h3 className="font-bold">Artisanat</h3>
            <p className="text-sm text-gray-600 mt-2">Perles, sculpture, costumes royaux</p>
          </div>

        </div>
      </section>

      {/* ================= RENAISSANCE ================= */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-700 text-white">

        <div className="container mx-auto px-6 text-center">

          <FaCrown className="text-4xl mx-auto mb-4" />

          <h2 className="text-3xl font-bold mb-6">
            Renaissance culturelle
          </h2>

          <p className="text-green-100 max-w-3xl mx-auto mb-12">
            Depuis 2016, Sa Majesté Momo Keubou Serges Evariste a lancé un vaste programme de valorisation culturelle.
          </p>

          <div className="grid md:grid-cols-4 gap-6 text-sm">

            <div className="bg-white/10 p-4 rounded-xl">
              Reconstruction de la chefferie
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              Musée des Arts et de la Culture
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              Festival permanent
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              Radio Bangang 99.5 FM
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <div className="text-center py-20">
        <Link
          href="/news"
          className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Suivre l’actualité culturelle
        </Link>
      </div>

    </div>
  );
}