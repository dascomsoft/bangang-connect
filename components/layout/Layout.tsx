'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth();
  }, [pathname]);
  
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const isAuth = response.ok;
      setIsAuthenticated(isAuth);
      
      // Rediriger si non authentifié et pas sur une page publique
      const publicPages = ['/', '/login', '/register'];
      const isPublicPage = publicPages.includes(pathname);
      
      if (!isAuth && !isPublicPage) {
        router.push('/login');
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 transition-all duration-300 ${isAuthenticated ? 'lg:ml-64' : ''}`}>
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}