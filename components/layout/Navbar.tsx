'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated: boolean;
}

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    try {
      // Appeler l'API de déconnexion
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Forcer un rechargement complet pour vider tous les états
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // En cas d'erreur, rediriger quand même
      window.location.href = '/login';
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  // Ne pas afficher la navbar sur la page login
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Bangang Connect
          </Link>
          
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/chat" 
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-red-600 hover:text-red-700 transition disabled:opacity-50"
                >
                  {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Connexion
                </Link>
                <Link 
                  href="/register" 
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}