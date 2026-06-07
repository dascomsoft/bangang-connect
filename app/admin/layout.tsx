import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
// import AdminTabs from './components/AdminTabs';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  // Vérification auth côté serveur - instantanée
  if (!token) {
    redirect('/login');
  }
  
  const user = verifyToken(token);
  if (!user || user.role !== 'super_admin') {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6">
          <h1 className="text-2xl font-bold">Administration</h1>
          <p className="text-purple-100 mt-1">Gestion complète de la plateforme Bangang Connect</p>
        </div> */}
        
        {/* Tabs navigation */}
        {/* <AdminTabs /> */}
        
        {/* Contenu avec Suspense pour le lazy loading */}
        <Suspense fallback={
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </div>
  );
}