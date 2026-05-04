// import type { Metadata } from 'next';
// import './globals.css';
// import Layout from '@/components/layout/Layout';
// import { Toaster } from 'react-hot-toast';
// import { SocketProvider } from '@/components/providers/SocketProvider';

// export const metadata: Metadata = {
//   title: 'Bangang Connect - Plateforme Communautaire',
//   description: 'Connectez-vous avec la communauté Bangang du Cameroun et de la diaspora',
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
//               background: '#363636',
//               color: '#fff',
//               borderRadius: '10px',
//             },
//             success: {
//               iconTheme: {
//                 primary: '#10B981',
//                 secondary: '#fff',
//               },
//             },
//             error: {
//               iconTheme: {
//                 primary: '#EF4444',
//                 secondary: '#fff',
//               },
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






















import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/layout/Layout';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from '@/components/providers/SocketProvider';

export const metadata: Metadata = {
  title: 'Bangang Connect - Plateforme Communautaire',
  description: 'Connectez-vous avec la communauté Bangang du Cameroun et de la diaspora',
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
              background: '#363636',
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