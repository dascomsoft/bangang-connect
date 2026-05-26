// app/layout.tsx - Version corrigée
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Layout from '@/components/layout/Layout';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from '@/components/providers/SocketProvider';

export const metadata: Metadata = {
  title: 'Bangang Connect - Plateforme Communautaire',
  description: 'Connectez-vous avec la communauté Bangang du Cameroun et de la diaspora',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'black',
              color: '#fff',
              borderRadius: '10px',
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