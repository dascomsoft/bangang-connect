


'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // =================================================
  // CHECK AUTH - UNE SEULE FOIS
  // =================================================
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // LAYOUT
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* NAVBAR - reçoit user directement */}
      <Navbar user={user} />

      <div className="flex pt-16">
        {/* SIDEBAR - reçoit user directement */}
        {user && <Sidebar user={user} />}

        {/* MAIN CONTENT - avec marge dynamique */}
        <main
          className={`flex-1 transition-all duration-300 ${
            user ? 'lg:ml-64' : ''
          }`}
        >
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}






















