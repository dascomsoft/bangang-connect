'use client';

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";

import {
  FaLandmark,
  FaCrown,
  FaMapMarkedAlt,
  FaUsers,
  FaRoad,
  FaMountain,
  FaGlobeAfrica
} from "react-icons/fa";

import { GiVillage, GiAfrica } from "react-icons/gi";

export default function BangangHistoryPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= HERO ULTRA IMPACT ================= */}
      <section
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Entrée-palais-royal-Bangang.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-5xl">

            <div className="flex items-center gap-3 text-green-300 mb-4">
              <GiAfrica className="text-2xl" />
              <span className="uppercase tracking-[0.4em] text-sm">
                Royaume & Héritage des Grassfields
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Histoire du village Bangang
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-3xl">
              Origine, fondation et dynastie d’un royaume atypique des Grassfields
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                href="#histoire"
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
              >
                Explorer l’histoire
              </Link>

              <Link
                href="/culture"
                className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Découvrir la culture
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section id="histoire" className="container mx-auto px-6 py-24 max-w-5xl text-center">

        <FaLandmark className="text-4xl text-green-600 mx-auto mb-6" />

        <h2 className="text-3xl font-bold mb-8">
          Introduction historique
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Situé dans le département des Bamboutos, arrondissement de Batcham,
          le groupement Bangang est l’un des plus peuplés de la région de l’Ouest du Cameroun
          (environ <strong>140 000 habitants sur 134 km²</strong>).
        </p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          Il fait partie du grand ensemble Ngyemboon (Ngiemboon), peuple des hautes terres de l’Ouest
          issu des grandes migrations bantoues venues du Soudan ancien via le Nigeria,
          avant de s’établir dans les Grassfields au XVIIIe siècle.
        </p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          Bangang se distingue par sa chefferie de premier degré (1977),
          et par sa tradition monarchique : un royaume guerrier et fédérateur
          ayant su préserver son identité face à la modernité.
        </p>

      </section>

      {/* ================= TERRITOIRE ================= */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-6xl">

          <div className="text-center mb-16">
            <FaMapMarkedAlt className="text-4xl text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold">
              Un territoire stratégique des Monts Bamboutos
            </h2>
          </div>

          <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            Bangang s’étend sur le flanc oriental des Monts Bamboutos avec une superficie de 134 km².
            Sa forme tentaculaire lui donne une frontière d’environ 90 km avec plusieurs groupements
            répartis entre les régions de l’Ouest et du Sud-Ouest.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">

            <Card className="p-6">
              <h3 className="font-bold mb-2">Nord-Ouest</h3>
              <p className="text-gray-600">
                Mbamock (Lebialem) et Fongo-Tongo (Menoua)
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Nord</h3>
              <p className="text-gray-600">
                Babadjou, Balatchi, Bamessingue
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Est</h3>
              <p className="text-gray-600">
                Mbouda, Bamougong, Batcham
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Sud</h3>
              <p className="text-gray-600">
                Balessing, Baleveng, Bafou
              </p>
            </Card>

          </div>

        </div>
      </section>

      {/* ================= POPULATION ================= */}
      <section className="container mx-auto px-6 py-24 max-w-5xl">

        <FaUsers className="text-4xl text-green-600 mx-auto mb-6" />

        <h2 className="text-3xl font-bold text-center mb-8">
          Population & Dynamique sociale
        </h2>

        <p className="text-gray-700 leading-relaxed text-center">
          La population de Bangang est estimée à environ <strong>140 000 habitants</strong>,
          avec une densité dépassant <strong>1 000 habitants/km²</strong>.
        </p>

        <p className="text-gray-700 mt-4 text-center">
          Forte pression démographique entraînant migrations saisonnières et déplacements
          vers les zones agricoles et les grandes villes comme Douala, Yaoundé, Bafoussam,
          Bamenda et le Moungo.
        </p>

      </section>

      {/* ================= FONDATION ================= */}
      <section className="bg-gray-50 py-24">

        <div className="container mx-auto px-6 max-w-5xl text-center">

          <GiVillage className="text-4xl text-green-600 mx-auto mb-6" />

          <h2 className="text-3xl font-bold mb-8">
            Fondation et dynastie royale
          </h2>

          <p className="text-gray-700 leading-relaxed">
            La chefferie Bangang naît sous Fouo Patouo, premier roi.
            Après des migrations (Mola, Balena, Batcham), le siège est définitivement établi.
          </p>

          <p className="text-gray-700 mt-4">
            Le territoire est structuré en villages fondateurs :
            Bamboue, Bantsiet, Bamessa, Mekoup, Mepibuea…
          </p>

        </div>

      </section>

      {/* ================= DYNASTIE ================= */}
      <section className="container mx-auto px-6 py-24">

        <FaCrown className="text-4xl text-yellow-500 mx-auto mb-6" />

        <h2 className="text-3xl font-bold text-center mb-10">
          Dynastie des 19 rois
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

          <Card className="p-6">
            <h3 className="font-bold">Ngung Ndjay</h3>
            <p>Premier roi élu à Nzie Nzye</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold">Rois intermédiaires</h3>
            <p>Fouo Lemouo, Zogning, Tetangou, Mbou’pouo, etc.</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold">Fouo Effenzi Pierre</h3>
            <p>Règne historique et figure emblématique</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold">Dynastie moderne</h3>
            <p>
              Momo Jean Norbert<br />
              Momo Joseph (1975–2016)<br />
              S.M. Momo Keubou Serges Evariste (depuis 2016)
            </p>
          </Card>

        </div>

      </section>

      {/* ================= HERITAGE ================= */}
      <section className="bg-gray-900 text-white py-24 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Héritage et singularité
        </h2>

        <p className="max-w-4xl mx-auto text-gray-300 leading-relaxed">
          Bangang incarne un modèle de royauté africaine moderne :
          autorité traditionnelle forte, conseil structuré des 9, notables et dignitaires,
          avec une ouverture vers l’éducation, le développement et la diaspora.
        </p>

      </section>

    </div>
  );
}