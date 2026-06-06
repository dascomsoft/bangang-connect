// 'use client';

// import { useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import Footer from './Footer';

// export default function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const response = await fetch('/api/auth/me');
//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error(error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 overflow-x-hidden flex flex-col">
//       <Navbar user={user} />

//       <div className="flex flex-1 pt-16">
//         {user && <Sidebar user={user} />}

//         <main
//           className={`flex-1 transition-all duration-300 ${user ? 'lg:ml-64' : ''
//             }`}
//         >
//           <div className="w-full">
//             {children}
//           </div>
//           <Footer />
//         </main>
//       </div>
//     </div>
//   );
// }
































































'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // ← AJOUTER
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname(); // ← AJOUTER
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Re-fetch à chaque changement de route
  useEffect(() => {
    checkAuth();
  }, [pathname]); // ← MODIFIER: ajouter pathname

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        cache: 'no-store', // ← Éviter le cache
      });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden flex flex-col">
      <Navbar user={user} />

      <div className="flex flex-1 ">
        {user && <Sidebar user={user} />}

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
      
      <Footer />
    </div>
  );
}