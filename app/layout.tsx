// // app/layout.tsx - Version corrigée
// import type { Metadata, Viewport } from 'next';
// import './globals.css';
// import Layout from '@/components/layout/Layout';
// import { Toaster } from 'react-hot-toast';
// import { SocketProvider } from '@/components/providers/SocketProvider';

// export const metadata: Metadata = {
//   title: 'Bangang Connect - Plateforme Communautaire',
//   description: 'Connectez-vous avec la communauté Bangang du Cameroun et de la diaspora',
// };

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: true,
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="fr">
//       <body>
//         <Toaster 
//           position="top-right"
//           toastOptions={{
//             duration: 3000,
//             style: {
//               background: 'black',
//               color: '#fff',
//               borderRadius: '10px',
//             },
//           }}
//         />
//         <SocketProvider>
//           <Layout>{children}</Layout>
//         </SocketProvider>
//       </body>
//     </html>
//   );
// }














































































































































































// app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";

import Layout from "@/components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/components/providers/SocketProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://bangang-connect.vercel.app"),

  title: {
    default: "Bangang Connect | Réseau mondial des fils et filles Bangang",
    template: "%s | Bangang Connect",
  },

  description:
    "Bangang Connect est la plateforme numérique officielle qui rassemble les fils et filles Bangang vivant au Cameroun et dans la diaspora mondiale. Culture, patrimoine, événements, opportunités, entraide et développement communautaire.",

  keywords: [
    "Bangang", "Bangang Connect", "Diaspora Bangang", "Communauté Bangang",
    "Bangang Cameroun", "Village Bangang", "Culture Bangang", "Patrimoine Bangang",
    "Chefferie Bangang", "Bamiléké", "Diaspora camerounaise", "Bangang France",
    "Bangang Belgique", "Bangang Canada", "Bangang USA", "Bangang Allemagne",
    "Bangang Royaume-Uni", "Investir à Bangang", "Développement communautaire",
    "Événements Bangang", "Association Bangang", "Fils et filles Bangang",
    "Réseau Bangang", "Culture camerounaise",
  ],

  authors: [{ name: "Bangang Connect" }],
  creator: "Bangang Connect",
  publisher: "Bangang Connect",
  category: "Community Platform",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://bangang-connect.vercel.app",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bangang-connect.vercel.app",
    siteName: "Bangang Connect",
    title: "Bangang Connect | Réseau mondial des fils et filles Bangang",
    description:
      "La plateforme numérique qui connecte la communauté Bangang au Cameroun et dans la diaspora mondiale.",
    images: [
      {
        url: "/banganglogo.png",
        width: 1200,
        height: 630,
        alt: "Bangang Connect",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bangang Connect | Réseau mondial des fils et filles Bangang",
    description: "Connecter la communauté Bangang à travers le monde.",
    images: ["/banganglogo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bangang Connect",
  url: "https://bangang-connect.vercel.app",
  logo: "https://bangang-connect.vercel.app/banganglogo.png",
  description:
    "Plateforme mondiale reliant les fils et filles Bangang vivant au Cameroun et dans la diaspora.",
  areaServed: [
    "Cameroon", "France", "Belgium", "Canada",
    "United States", "Germany", "United Kingdom", "Switzerland",
  ],
  keywords: [
    "Bangang", "Diaspora Bangang", "Communauté Bangang", "Culture Bangang",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/banganglogo.png" type="image/png" />
        <link rel="shortcut icon" href="/banganglogo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/banganglogo.png" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "black",
              color: "#fff",
              borderRadius: "10px",
            },
          }}
        />

        <SocketProvider>
          <Layout>{children}</Layout>
        </SocketProvider>
      </body>
    </html>
  );
}