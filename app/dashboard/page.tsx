


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRouter() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      
      const data = await response.json();
      const user = data.user;
      
      // Redirection selon le rôle
      switch (user.role) {
        case 'super_admin':
          router.push('/dashboard/admin');
          break;
        case 'sector_president':
          router.push('/dashboard/president');
          break;
        case 'community_chief':
          router.push('/dashboard/community');
          break;
        case 'village_chief':
          router.push('/dashboard/village');
          break;
        default:
          router.push('/dashboard/member');
      }
    } catch (error) {
      console.error('Error checking role:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return null;
}






