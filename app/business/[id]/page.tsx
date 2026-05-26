



// // app/business/[id]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Card from '@/components/ui/Card';
// import Button from '@/components/ui/Button';
// import { toast } from 'react-hot-toast';
// import Image from 'next/image';

// interface Business {
//   _id: string;
//   businessName: string;
//   category: string;
//   description: string;
//   phone: string;
//   whatsapp?: string;
//   location: string;
//   city: string;
//   logo: string;
//   images: string[];
//   isSponsored: boolean;
//   isVerified: boolean;
//   views: number;
//   ownerId: { name: string; photo: string; _id: string };
//   status: string;
//   createdAt: string;
// }

// export default function BusinessDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [business, setBusiness] = useState<Business | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<any>(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     fetchUser();
//     fetchBusinessDetail();
//   }, [params.id]);

//   const fetchUser = async () => {
//     const res = await fetch('/api/auth/me');
//     if (res.ok) {
//       const data = await res.json();
//       setUser(data.user);
//     }
//   };

//   const fetchBusinessDetail = async () => {
//     try {
//       const res = await fetch(`/api/businesses/${params.id}`);
//       if (res.ok) {
//         const data = await res.json();
//         setBusiness(data);
//       } else {
//         toast.error('Entreprise non trouvée');
//         router.push('/business');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Erreur de chargement');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) return;
    
//     try {
//       const res = await fetch(`/api/businesses/${params.id}`, {
//         method: 'DELETE',
//       });
      
//       if (res.ok) {
//         toast.success('Entreprise supprimée');
//         router.push('/business');
//       } else {
//         toast.error('Erreur lors de la suppression');
//       }
//     } catch (error) {
//       toast.error('Erreur serveur');
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!business) return;
    
//     setEditing(true);
//     try {
//       const res = await fetch(`/api/businesses/${params.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(business),
//       });
      
//       if (res.ok) {
//         toast.success('Entreprise mise à jour');
//         setShowEditModal(false);
//         fetchBusinessDetail();
//       } else {
//         toast.error('Erreur');
//       }
//     } catch (error) {
//       toast.error('Erreur serveur');
//     } finally {
//       setEditing(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//       </div>
//     );
//   }

//   if (!business) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h1 className="text-2xl font-bold">Entreprise non trouvée</h1>
//         <Button onClick={() => router.push('/business')} className="mt-4">
//           Retour
//         </Button>
//       </div>
//     );
//   }

//   const isOwner = user?._id === business.ownerId?._id;
//   const isAdmin = user?.role === 'super_admin';
//   const canEdit = isOwner || isAdmin;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Bouton retour */}
//       <button 
//         onClick={() => router.back()}
//         className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
//       >
//         ← Retour
//       </button>

//       {/* Header avec image de couverture */}
//       <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
//         {business.images && business.images[0] ? (
//           <img 
//             src={business.images[0]} 
//             alt={business.businessName}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
//             <div className="text-8xl">🏢</div>
//           </div>
//         )}
        
//         {/* Logo superposé */}
//         <div className="absolute -bottom-12 left-8">
//           <div className="bg-white rounded-full p-2 shadow-lg">
//             {business.logo && business.logo !== '/default-business.png' ? (
//               <img 
//                 src={business.logo} 
//                 alt={business.businessName}
//                 className="w-28 h-28 rounded-full object-cover border-4 border-white"
//               />
//             ) : (
//               <div className="w-28 h-28 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-5xl">
//                 🏪
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Contenu principal */}
//       <div className="mt-16">
//         <div className="flex justify-between items-start flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-bold">{business.businessName}</h1>
//             <div className="flex gap-2 mt-2">
//               <span className="text-green-600">{business.category}</span>
//               <span className="text-gray-400">•</span>
//               <span className="text-gray-600">{business.city}, {business.location}</span>
//             </div>
//           </div>
          
//           {/* Actions */}
//           {canEdit && (
//             <div className="flex gap-2">
//               <Button 
//                 variant="secondary" 
//                 onClick={() => setShowEditModal(true)}
//               >
//                 ✏️ Modifier
//               </Button>
//               <Button 
//                 variant="danger" 
//                 onClick={handleDelete}
//               >
//                 🗑️ Supprimer
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         <Card className="mt-6 p-6">
//           <h2 className="text-xl font-bold mb-4">À propos</h2>
//           <p className="text-gray-700 whitespace-pre-wrap">{business.description}</p>
//         </Card>

//         {/* Contact */}
//         <Card className="mt-6 p-6">
//           <h2 className="text-xl font-bold mb-4">Contact</h2>
//           <div className="space-y-3">
//             <div className="flex items-center gap-3">
//               <span className="text-2xl">📞</span>
//               <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
//                 {business.phone}
//               </a>
//             </div>
//             {business.whatsapp && (
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">💬</span>
//                 <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
//                   {business.whatsapp}
//                 </a>
//               </div>
//             )}
//             <div className="flex items-center gap-3">
//               <span className="text-2xl">📍</span>
//               <span>{business.location}, {business.city}</span>
//             </div>
//           </div>
//         </Card>

//         {/* Galerie photos */}
//         {business.images && business.images.length > 1 && (
//           <Card className="mt-6 p-6">
//             <h2 className="text-xl font-bold mb-4">Galerie</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {business.images.slice(1).map((img, idx) => (
//                 <img 
//                   key={idx} 
//                   src={img} 
//                   alt={`Photo ${idx + 2}`}
//                   className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90"
//                   onClick={() => window.open(img, '_blank')}
//                 />
//               ))}
//             </div>
//           </Card>
//         )}
//       </div>

//       {/* Modal d'édition */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Card className="max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Modifier l'entreprise</h2>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Nom de l'entreprise"
//                 value={business.businessName}
//                 onChange={(e) => setBusiness({...business, businessName: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//               />
//               <select
//                 value={business.category}
//                 onChange={(e) => setBusiness({...business, category: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//               >
//                 <option value="agriculture">🌾 Agriculture</option>
//                 <option value="commerce">🛒 Commerce</option>
//                 <option value="services">💼 Services</option>
//                 <option value="tech">💻 Tech</option>
//                 <option value="artisanat">🎨 Artisanat</option>
//                 <option value="restauration">🍽️ Restauration</option>
//               </select>
//               <textarea
//                 placeholder="Description"
//                 value={business.description}
//                 onChange={(e) => setBusiness({...business, description: e.target.value})}
//                 rows={4}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//               />
//               <div className="grid md:grid-cols-2 gap-4">
//                 <input
//                   type="tel"
//                   placeholder="Téléphone"
//                   value={business.phone}
//                   onChange={(e) => setBusiness({...business, phone: e.target.value})}
//                   className="px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="WhatsApp"
//                   value={business.whatsapp || ''}
//                   onChange={(e) => setBusiness({...business, whatsapp: e.target.value})}
//                   className="px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Ville"
//                   value={business.city}
//                   onChange={(e) => setBusiness({...business, city: e.target.value})}
//                   className="px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Localisation"
//                   value={business.location}
//                   onChange={(e) => setBusiness({...business, location: e.target.value})}
//                   className="px-3 py-2 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <Button type="submit" disabled={editing}>
//                   {editing ? 'Enregistrement...' : 'Enregistrer'}
//                 </Button>
//                 <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                   Annuler
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }








































































// app/business/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

interface Business {
  _id: string;
  businessName: string;
  category: string;
  description: string;
  phone: string;
  whatsapp?: string;
  location: string;
  city: string;
  logo: string;
  images: string[];
  isSponsored: boolean;
  isVerified: boolean;
  views: number;
  ownerId: { name: string; photo: string; _id: string };
  status: string;
  createdAt: string;
}

export default function BusinessDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
    fetchBusinessDetail();
  }, [params.id]);

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  const fetchBusinessDetail = async () => {
    try {
      const res = await fetch(`/api/businesses/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBusiness(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        } else if (data.logo && data.logo !== '/default-business.png') {
          setSelectedImage(data.logo);
        }
      } else {
        toast.error('Entreprise non trouvée');
        router.push('/business');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) return;
    
    try {
      const res = await fetch(`/api/businesses/${params.id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        toast.success('Entreprise supprimée');
        router.push('/business');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    
    setEditing(true);
    try {
      const res = await fetch(`/api/businesses/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(business),
      });
      
      if (res.ok) {
        toast.success('Entreprise mise à jour');
        setShowEditModal(false);
        fetchBusinessDetail();
      } else {
        toast.error('Erreur');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Entreprise non trouvée</h1>
        <Button onClick={() => router.push('/business')} className="mt-4">
          Retour
        </Button>
      </div>
    );
  }

  const isOwner = user?._id === business.ownerId?._id;
  const isAdmin = user?.role === 'super_admin';
  const canEdit = isOwner || isAdmin;
  
  const allImages = business.images || (business.logo && business.logo !== '/default-business.png' ? [business.logo] : []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        ← Retour
      </button>

      {/* Galerie principale */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {/* Image principale */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 aspect-video">
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt={business.businessName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full"></div>
          )}
        </div>
        
        {/* Miniatures */}
        <div className="grid grid-cols-3 gap-2">
          {allImages.slice(0, 3).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`rounded-lg overflow-hidden bg-gray-100 aspect-square ${
                selectedImage === img ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <img 
                src={img} 
                alt={`Photo ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Informations */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold">{business.businessName}</h1>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-green-600">{business.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{business.city}, {business.location}</span>
                </div>
              </div>
              
              {canEdit && (
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowEditModal(true)}
                  >
                    ✏️ Modifier
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={handleDelete}
                  >
                    🗑️ Supprimer
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">À propos</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{business.description}</p>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Contact */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Téléphone</p>
                <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                  {business.phone}
                </a>
              </div>
              {business.whatsapp && (
                <div>
                  <p className="text-gray-500 text-sm">WhatsApp</p>
                  <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                    {business.whatsapp}
                  </a>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-sm">Adresse</p>
                <p className="text-gray-700">{business.location}, {business.city}</p>
              </div>
            </div>
          </Card>

          {/* Logo */}
          {business.logo && business.logo !== '/default-business.png' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Logo</h2>
              <img 
                src={business.logo} 
                alt={`Logo ${business.businessName}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </Card>
          )}
        </div>
      </div>

      {/* Galerie complète */}
      {allImages.length > 1 && (
        <Card className="mt-8 p-6">
          <h2 className="text-xl font-bold mb-4">Galerie photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <img 
                  src={img} 
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-full object-cover hover:opacity-90 transition"
                />
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Modal d'édition */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Modifier l'entreprise</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Nom de l'entreprise"
                value={business.businessName}
                onChange={(e) => setBusiness({...business, businessName: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <select
                value={business.category}
                onChange={(e) => setBusiness({...business, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="agriculture">🌾 Agriculture</option>
                <option value="commerce">🛒 Commerce</option>
                <option value="services">💼 Services</option>
                <option value="tech">💻 Tech</option>
                <option value="artisanat">🎨 Artisanat</option>
                <option value="restauration">🍽️ Restauration</option>
              </select>
              <textarea
                placeholder="Description"
                value={business.description}
                onChange={(e) => setBusiness({...business, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={business.phone}
                  onChange={(e) => setBusiness({...business, phone: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="WhatsApp"
                  value={business.whatsapp || ''}
                  onChange={(e) => setBusiness({...business, whatsapp: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ville"
                  value={business.city}
                  onChange={(e) => setBusiness({...business, city: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Localisation"
                  value={business.location}
                  onChange={(e) => setBusiness({...business, location: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={editing}>
                  {editing ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}