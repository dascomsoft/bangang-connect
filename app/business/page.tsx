// // app/business/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Card from '@/components/ui/Card';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import ImageUpload from '@/components/ui/ImageUpload';
// import { toast } from 'react-hot-toast';

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
//   images?: string[];
//   isSponsored: boolean;
//   isVerified: boolean;
//   views: number;
//   status?: 'pending' | 'approved' | 'rejected';
//   ownerId: { name: string; photo: string };
// }

// interface Job {
//   _id: string;
//   title: string;
//   companyName: string;
//   description: string;
//   requirements: string[];
//   location: string;
//   salary: string;
//   contractType: string;
//   isSponsored: boolean;
//   deadline: string;
//   companyLogo?: string;
// }

// interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   images: string[];
//   condition: string;
//   isSponsored: boolean;
//   sellerId: { name: string; photo: string };
// }

// export default function BusinessPage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState('businesses');
//   const [user, setUser] = useState<any>(null);
  
//   // États pour les données
//   const [businesses, setBusinesses] = useState<Business[]>([]);
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // États pour les filtres
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   // États pour les formulaires
//   const [showBusinessForm, setShowBusinessForm] = useState(false);
//   const [showJobForm, setShowJobForm] = useState(false);
//   const [showProductForm, setShowProductForm] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
  
//   // Formulaire entreprise
//   const [newBusiness, setNewBusiness] = useState({
//     businessName: '',
//     category: 'commerce',
//     description: '',
//     phone: '',
//     whatsapp: '',
//     location: '',
//     city: '',
//     logo: '',
//     images: [] as string[]
//   });
  
//   // Formulaire emploi
//   const [newJob, setNewJob] = useState({
//     title: '',
//     companyName: '',
//     description: '',
//     requirements: '',
//     location: '',
//     salary: '',
//     contractType: 'CDI',
//     deadline: '',
//     companyLogo: ''
//   });
  
//   // Formulaire produit
//   const [newProduct, setNewProduct] = useState({
//     title: '',
//     description: '',
//     price: '',
//     category: 'produit',
//     condition: 'neuf',
//     images: [] as string[]
//   });
  
//   useEffect(() => {
//     fetchUser();
//     fetchBusinesses();
//     fetchJobs();
//     fetchProducts();
//   }, []);
  
//   useEffect(() => {
//     fetchBusinesses();
//   }, [selectedCategory, searchTerm]);
  
//   useEffect(() => {
//     fetchJobs();
//   }, [searchTerm]);
  
//   useEffect(() => {
//     fetchProducts();
//   }, [searchTerm]);
  
//   const fetchUser = async () => {
//     const res = await fetch('/api/auth/me');
//     if (res.ok) {
//       const data = await res.json();
//       setUser(data.user);
//     }
//   };
  
// // app/business/page.tsx - Modifiez fetchBusinesses
// const fetchBusinesses = async () => {
//   try {
//     const res = await fetch(`/api/businesses?category=${selectedCategory}&search=${searchTerm}`);
//     const data = await res.json();
//     // Ne montrer QUE les entreprises approuvées
//     const approvedBusinesses = data.filter((b: Business) => b.status === 'approved');
//     setBusinesses(approvedBusinesses);
//   } catch (error) {
//     console.error(error);
//   }
// };
  
//   const fetchJobs = async () => {
//     try {
//       const res = await fetch(`/api/jobs?search=${searchTerm}`);
//       const data = await res.json();
//       setJobs(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(`/api/products?search=${searchTerm}`);
//       const data = await res.json();
//       setProducts(data);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleBusinessLogoUpload = (urls: string[]) => {
//     setNewBusiness({...newBusiness, logo: urls[0] || ''});
//   };
  
//   const handleBusinessImagesUpload = (urls: string[]) => {
//     setNewBusiness({...newBusiness, images: urls});
//   };
  
//   const handleProductImagesUpload = (urls: string[]) => {
//     setNewProduct({...newProduct, images: urls});
//   };
  
//   const handleJobLogoUpload = (urls: string[]) => {
//     setNewJob({...newJob, companyLogo: urls[0] || ''});
//   };
  
//   const handleCreateBusiness = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Connectez-vous pour ajouter une entreprise');
//       router.push('/login');
//       return;
//     }
    
//     setSubmitting(true);
//     try {
//       const res = await fetch('/api/businesses', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...newBusiness,
//           logo: newBusiness.logo || '/default-business.png'
//         })
//       });
      
//       const data = await res.json();
      
//       if (res.ok) {
//         // Afficher un message personnalisé selon le rôle
//         if (user.role === 'super_admin') {
//           toast.success('✅ Entreprise ajoutée et publiée directement !');
//         } else {
//           toast.success('📝 Entreprise ajoutée avec succès ! En attente de validation par un administrateur.', {
//             duration: 5000,
//             icon: '⏳'
//           });
//         }
//         setShowBusinessForm(false);
//         setNewBusiness({
//           businessName: '', category: 'commerce', description: '',
//           phone: '', whatsapp: '', location: '', city: '', logo: '', images: []
//         });
//         fetchBusinesses();
//       } else {
//         toast.error(data.error || 'Erreur lors de l\'ajout');
//       }
//     } catch (error) {
//       toast.error('Erreur serveur');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   const handleCreateJob = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Connectez-vous pour publier une offre');
//       router.push('/login');
//       return;
//     }
    
//     setSubmitting(true);
//     try {
//       const res = await fetch('/api/jobs', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...newJob,
//           requirements: newJob.requirements.split(',').map(r => r.trim())
//         })
//       });
      
//       if (res.ok) {
//         toast.success('Offre publiée avec succès !');
//         setShowJobForm(false);
//         setNewJob({
//           title: '', companyName: '', description: '', requirements: '',
//           location: '', salary: '', contractType: 'CDI', deadline: '', companyLogo: ''
//         });
//         fetchJobs();
//       } else {
//         toast.error('Erreur');
//       }
//     } catch (error) {
//       toast.error('Erreur serveur');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   const handleCreateProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Connectez-vous pour vendre un produit');
//       router.push('/login');
//       return;
//     }
    
//     setSubmitting(true);
//     try {
//       const res = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...newProduct,
//           price: parseInt(newProduct.price)
//         })
//       });
      
//       if (res.ok) {
//         toast.success('Produit ajouté avec succès !');
//         setShowProductForm(false);
//         setNewProduct({
//           title: '', description: '', price: '', category: 'produit', condition: 'neuf', images: []
//         });
//         fetchProducts();
//       } else {
//         toast.error('Erreur');
//       }
//     } catch (error) {
//       toast.error('Erreur serveur');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   const categories = [
//     { value: 'all', label: 'Toutes' },
//     { value: 'agriculture', label: '🌾 Agriculture' },
//     { value: 'commerce', label: '🛒 Commerce' },
//     { value: 'services', label: '💼 Services' },
//     { value: 'tech', label: '💻 Tech' },
//     { value: 'artisanat', label: '🎨 Artisanat' },
//     { value: 'restauration', label: '🍽️ Restauration' }
//   ];
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="container mx-auto px-4 py-8 space-y-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
//         <h1 className="text-3xl font-bold mb-2">💰 Espace Économique Bangang</h1>
//         <p className="text-green-100">
//           Annuaire des entreprises, offres d'emploi et marketplace communautaire
//         </p>
//       </div>
      
//       {/* Barre de recherche et filtres */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1">
//           <Input
//             placeholder="Rechercher une entreprise, un produit, une offre..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full"
//           />
//         </div>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="px-4 py-2 border rounded-lg"
//         >
//           {categories.map(cat => (
//             <option key={cat.value} value={cat.value}>{cat.label}</option>
//           ))}
//         </select>
//         <Button onClick={() => {
//           fetchBusinesses();
//           fetchJobs();
//           fetchProducts();
//         }}>
//           🔍 Rechercher
//         </Button>
//       </div>
      
//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 border-b">
//         <button
//           onClick={() => setActiveTab('businesses')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'businesses' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           🏪 Annuaire ({businesses.length})
//         </button>
//         <button
//           onClick={() => setActiveTab('jobs')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'jobs' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           💼 Offres d'emploi ({jobs.length})
//         </button>
//         <button
//           onClick={() => setActiveTab('marketplace')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'marketplace' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           🛍️ Marketplace ({products.length})
//         </button>
//       </div>
      
//       {/* Bannière d'information pour les membres */}
//       {user && user.role !== 'super_admin' && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <div className="flex items-start gap-3">
//             <span className="text-2xl">⏳</span>
//             <div>
//               <h3 className="font-semibold text-blue-800">Validation en attente</h3>
//               <p className="text-sm text-blue-600">
//                 Les entreprises que vous ajoutez seront visibles par les administrateurs pour validation. 
//                 Une fois approuvées, elles apparaîtront publiquement dans l'annuaire.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Bannière pour admin */}
//    *
      
//       {/* ==================== ENTREPRISES ==================== */}
//       {activeTab === 'businesses' && (
//         <div className="space-y-6">
//           <div className="flex justify-end">
//             <Button onClick={() => setShowBusinessForm(!showBusinessForm)}>
//               {showBusinessForm ? 'Annuler' : '+ Ajouter mon entreprise'}
//             </Button>
//           </div>
          
//           {showBusinessForm && (
//             <Card className="p-6">
//               <h2 className="text-xl font-bold mb-4">Nouvelle entreprise</h2>
              
//               {/* Message spécifique dans le formulaire */}
//               {user && user.role !== 'super_admin' && (
//                 <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
//                   <p className="text-sm text-yellow-800">
//                     ⏳ <span className="font-semibold">Information :</span> Votre entreprise sera soumise à validation par un administrateur avant d'être publiée.
//                   </p>
//                 </div>
//               )}
              
//               <form onSubmit={handleCreateBusiness} className="space-y-4">
//                 <Input
//                   label="Nom de l'entreprise *"
//                   required
//                   value={newBusiness.businessName}
//                   onChange={(e) => setNewBusiness({...newBusiness, businessName: e.target.value})}
//                 />
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Catégorie *</label>
//                   <select
//                     required
//                     value={newBusiness.category}
//                     onChange={(e) => setNewBusiness({...newBusiness, category: e.target.value})}
//                     className="w-full px-3 py-2 border rounded-lg"
//                   >
//                     {categories.filter(c => c.value !== 'all').map(cat => (
//                       <option key={cat.value} value={cat.value}>{cat.label}</option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Description *</label>
//                   <textarea
//                     required
//                     rows={3}
//                     value={newBusiness.description}
//                     onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})}
//                     className="w-full px-3 py-2 border rounded-lg"
//                   />
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <Input
//                     label="Téléphone *"
//                     required
//                     value={newBusiness.phone}
//                     onChange={(e) => setNewBusiness({...newBusiness, phone: e.target.value})}
//                   />
//                   <Input
//                     label="WhatsApp"
//                     value={newBusiness.whatsapp}
//                     onChange={(e) => setNewBusiness({...newBusiness, whatsapp: e.target.value})}
//                   />
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <Input
//                     label="Ville *"
//                     required
//                     value={newBusiness.city}
//                     onChange={(e) => setNewBusiness({...newBusiness, city: e.target.value})}
//                   />
//                   <Input
//                     label="Localisation *"
//                     required
//                     value={newBusiness.location}
//                     onChange={(e) => setNewBusiness({...newBusiness, location: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Logo de l'entreprise</label>
//                   <ImageUpload
//                     onImagesUploaded={handleBusinessLogoUpload}
//                     multiple={false}
//                     maxImages={1}
//                     existingImages={newBusiness.logo ? [newBusiness.logo] : []}
//                     folder="businesses/logos"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Photos de l'entreprise</label>
//                   <ImageUpload
//                     onImagesUploaded={handleBusinessImagesUpload}
//                     multiple={true}
//                     maxImages={5}
//                     existingImages={newBusiness.images}
//                     folder="businesses/gallery"
//                   />
//                 </div>
                
//                 <div className="bg-yellow-50 p-3 rounded-lg">
//                   <p className="text-sm text-yellow-800">
//                     💡 Astuce : Pour être mis en avant, passez à l'offre Premium (25 000 FCFA/an)
//                   </p>
//                 </div>
                
//                 <Button type="submit" disabled={submitting}>
//                   {submitting 
//                     ? 'Ajout...' 
//                     : user?.role === 'super_admin' 
//                       ? '✅ Publier directement' 
//                       : '📝 Soumettre à validation'}
//                 </Button>
//               </form>
//             </Card>
//           )}
          
//           {/* Liste des entreprises */}
//           {businesses.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl">
//               <p className="text-gray-500">Aucune entreprise pour le moment</p>
//               {user && (
//                 <Button 
//                   onClick={() => setShowBusinessForm(true)} 
//                   className="mt-4"
//                 >
//                   + Ajouter la première entreprise
//                 </Button>
//               )}
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {businesses.map((business) => (
//                 <Card key={business._id} className="overflow-hidden hover:shadow-xl transition cursor-pointer"
//                   onClick={() => router.push(`/business/${business._id}`)}>
//                   <div className="relative h-32 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
//                     {business.logo && business.logo !== '/default-business.png' ? (
//                       <img src={business.logo} className="h-20 w-20 rounded-full object-cover border-4 border-white" />
//                     ) : (
//                       <div className="text-5xl">🏪</div>
//                     )}
//                     {business.isSponsored && (
//                       <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
//                         ⭐ Sponsor
//                       </span>
//                     )}
//                     {business.isVerified && (
//                       <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
//                         ✓ Vérifié
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-bold text-lg">{business.businessName}</h3>
//                     <p className="text-green-600 text-sm">{business.category}</p>
//                     <p className="text-gray-500 text-sm">{business.city}, {business.location}</p>
//                     <p className="text-gray-600 text-sm mt-2 line-clamp-2">{business.description}</p>
//                     <div className="flex gap-2 mt-4">
//                       <a href={`tel:${business.phone}`} className="flex-1">
//                         <Button size="sm" variant="secondary" className="w-full">📞 Appeler</Button>
//                       </a>
//                       {business.whatsapp && (
//                         <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1">
//                           <Button size="sm" className="w-full bg-green-600">💬 WhatsApp</Button>
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* ==================== OFFRES D'EMPLOI ==================== */}
//       {activeTab === 'jobs' && (
//         <div className="space-y-6">
//           <div className="flex justify-end">
//             <Button onClick={() => setShowJobForm(!showJobForm)}>
//               {showJobForm ? 'Annuler' : '+ Publier une offre'}
//             </Button>
//           </div>
          
//           {showJobForm && (
//             <Card className="p-6">
//               <h2 className="text-xl font-bold mb-4">Nouvelle offre d'emploi</h2>
//               <form onSubmit={handleCreateJob} className="space-y-4">
//                 <Input 
//                   label="Titre du poste *" 
//                   required 
//                   value={newJob.title}
//                   onChange={(e) => setNewJob({...newJob, title: e.target.value})} 
//                 />
                
//                 <Input 
//                   label="Nom de l'entreprise *" 
//                   required 
//                   value={newJob.companyName}
//                   onChange={(e) => setNewJob({...newJob, companyName: e.target.value})} 
//                 />
                
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Logo de l'entreprise</label>
//                   <ImageUpload
//                     onImagesUploaded={handleJobLogoUpload}
//                     multiple={false}
//                     maxImages={1}
//                     existingImages={newJob.companyLogo ? [newJob.companyLogo] : []}
//                     folder="jobs/logos"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Description *</label>
//                   <textarea 
//                     required 
//                     rows={3} 
//                     value={newJob.description}
//                     onChange={(e) => setNewJob({...newJob, description: e.target.value})}
//                     className="w-full px-3 py-2 border rounded-lg" 
//                   />
//                 </div>
                
//                 <Input 
//                   label="Prérequis (séparés par des virgules)" 
//                   value={newJob.requirements}
//                   onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} 
//                 />
                
//                 <Input 
//                   label="Localisation *" 
//                   required 
//                   value={newJob.location}
//                   onChange={(e) => setNewJob({...newJob, location: e.target.value})} 
//                 />
                
//                 <Input 
//                   label="Salaire" 
//                   value={newJob.salary}
//                   onChange={(e) => setNewJob({...newJob, salary: e.target.value})} 
//                 />
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Type de contrat *</label>
//                   <select 
//                     value={newJob.contractType} 
//                     onChange={(e) => setNewJob({...newJob, contractType: e.target.value})}
//                     className="w-full px-3 py-2 border rounded-lg"
//                   >
//                     <option>CDI</option>
//                     <option>CDD</option>
//                     <option>stage</option>
//                     <option>freelance</option>
//                   </select>
//                 </div>
                
//                 <Input 
//                   type="date" 
//                   label="Date limite" 
//                   value={newJob.deadline}
//                   onChange={(e) => setNewJob({...newJob, deadline: e.target.value})} 
//                 />
                
//                 <div className="bg-yellow-50 p-3 rounded-lg">
//                   <p className="text-sm text-yellow-800">📢 Publication payante : 15 000 FCFA</p>
//                 </div>
                
//                 <Button type="submit" disabled={submitting}>
//                   {submitting ? 'Publication...' : '✅ Publier (15 000 FCFA)'}
//                 </Button>
//               </form>
//             </Card>
//           )}
          
//           {jobs.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl">
//               <p className="text-gray-500">Aucune offre d'emploi</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {jobs.map((job) => (
//                 <Card key={job._id} className="p-6">
//                   <div className="flex justify-between items-start">
//                     <div className="flex gap-4">
//                       {job.companyLogo && (
//                         <img src={job.companyLogo} className="w-16 h-16 rounded-full object-cover" />
//                       )}
//                       <div>
//                         <h3 className="font-bold text-xl">{job.title}</h3>
//                         <p className="text-gray-600">{job.companyName} • {job.location}</p>
//                         <div className="flex gap-2 mt-2">
//                           <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{job.contractType}</span>
//                           {job.salary && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{job.salary}</span>}
//                         </div>
//                         <p className="text-gray-600 mt-3">{job.description.substring(0, 200)}...</p>
//                       </div>
//                     </div>
//                     <Button>Postuler</Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* ==================== MARKETPLACE ==================== */}
//       {activeTab === 'marketplace' && (
//         <div className="space-y-6">
//           <div className="flex justify-end">
//             <Button onClick={() => setShowProductForm(!showProductForm)}>
//               {showProductForm ? 'Annuler' : '+ Vendre un produit'}
//             </Button>
//           </div>
          
//           {showProductForm && (
//             <Card className="p-6">
//               <h2 className="text-xl font-bold mb-4">Nouveau produit</h2>
//               <form onSubmit={handleCreateProduct} className="space-y-4">
//                 <Input 
//                   label="Titre *" 
//                   required 
//                   value={newProduct.title}
//                   onChange={(e) => setNewProduct({...newProduct, title: e.target.value})} 
//                 />
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Description *</label>
//                   <textarea 
//                     required 
//                     rows={3} 
//                     value={newProduct.description}
//                     onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
//                     className="w-full px-3 py-2 border rounded-lg" 
//                   />
//                 </div>
                
//                 <Input 
//                   type="number" 
//                   label="Prix (FCFA) *" 
//                   required 
//                   value={newProduct.price}
//                   onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
//                 />
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Catégorie *</label>
//                   <select 
//                     value={newProduct.category} 
//                     onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
//                     className="w-full px-3 py-2 border rounded-lg"
//                   >
//                     <option value="produit">Produit</option>
//                     <option value="service">Service</option>
//                     <option value="location">Location</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">État</label>
//                   <select 
//                     value={newProduct.condition} 
//                     onChange={(e) => setNewProduct({...newProduct, condition: e.target.value})}
//                     className="w-full px-3 py-2 border rounded-lg"
//                   >
//                     <option>neuf</option>
//                     <option>comme neuf</option>
//                     <option>très bon</option>
//                     <option>bon</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Photos du produit *</label>
//                   <ImageUpload
//                     onImagesUploaded={handleProductImagesUpload}
//                     multiple={true}
//                     maxImages={5}
//                     existingImages={newProduct.images}
//                     folder="products"
//                   />
//                 </div>
                
//                 <div className="bg-yellow-50 p-3 rounded-lg">
//                   <p className="text-sm text-yellow-800">📢 Publication : 5 000 FCFA | Sponsoring : 25 000 FCFA</p>
//                 </div>
                
//                 <Button type="submit" disabled={submitting}>
//                   {submitting ? 'Ajout...' : '✅ Publier (5 000 FCFA)'}
//                 </Button>
//               </form>
//             </Card>
//           )}
          
//           {products.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl">
//               <p className="text-gray-500">Aucun produit</p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <Card key={product._id} className="overflow-hidden hover:shadow-xl transition">
//                   <div className="relative h-48 bg-gray-200">
//                     {product.images && product.images[0] ? (
//                       <img src={product.images[0]} className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-6xl">🛍️</div>
//                     )}
//                     {product.isSponsored && (
//                       <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">⭐ Sponsor</span>
//                     )}
//                     {product.images && product.images.length > 1 && (
//                       <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
//                         +{product.images.length - 1}
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-bold text-lg">{product.title}</h3>
//                     <p className="text-green-700 font-bold text-xl">{product.price.toLocaleString()} FCFA</p>
//                     <p className="text-gray-500 text-sm mt-1">État: {product.condition}</p>
//                     <p className="text-gray-500 text-sm">{product.description.substring(0, 100)}...</p>
//                     <Button size="sm" className="mt-3 w-full">Contacter</Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



















































// app/business/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUpload from '@/components/ui/ImageUpload';
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
  images?: string[];
  isSponsored: boolean;
  isVerified: boolean;
  views: number;
  status?: 'pending' | 'approved' | 'rejected';
  ownerId: { name: string; photo: string };
}

interface Job {
  _id: string;
  title: string;
  companyName: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  contractType: string;
  isSponsored: boolean;
  deadline: string;
  companyLogo?: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  condition: string;
  isSponsored: boolean;
  sellerId: { name: string; photo: string };
}

export default function BusinessPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('businesses');
  const [user, setUser] = useState<any>(null);
  
  // États pour les données
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // États pour les formulaires
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Formulaire entreprise
  const [newBusiness, setNewBusiness] = useState({
    businessName: '',
    category: 'commerce',
    description: '',
    phone: '',
    whatsapp: '',
    location: '',
    city: '',
    logo: '',
    images: [] as string[]
  });
  
  // Formulaire emploi
  const [newJob, setNewJob] = useState({
    title: '',
    companyName: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    contractType: 'CDI',
    deadline: '',
    companyLogo: ''
  });
  
  // Formulaire produit
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: 'produit',
    condition: 'neuf',
    images: [] as string[]
  });
  
  useEffect(() => {
    fetchUser();
    fetchBusinesses();
    fetchJobs();
    fetchProducts();
  }, []);
  
  useEffect(() => {
    fetchBusinesses();
  }, [selectedCategory, searchTerm]);
  
  useEffect(() => {
    fetchJobs();
  }, [searchTerm]);
  
  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);
  
  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };
  
  const fetchBusinesses = async () => {
    try {
      const res = await fetch(`/api/businesses?category=${selectedCategory}&search=${searchTerm}`);
      const data = await res.json();
      const approvedBusinesses = data.filter((b: Business) => b.status === 'approved');
      setBusinesses(approvedBusinesses);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchJobs = async () => {
    try {
      const res = await fetch(`/api/jobs?search=${searchTerm}`);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products?search=${searchTerm}`);
      const data = await res.json();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBusinessLogoUpload = (urls: string[]) => {
    setNewBusiness({...newBusiness, logo: urls[0] || ''});
  };
  
  const handleBusinessImagesUpload = (urls: string[]) => {
    setNewBusiness({...newBusiness, images: urls});
  };
  
  const handleProductImagesUpload = (urls: string[]) => {
    setNewProduct({...newProduct, images: urls});
  };
  
  const handleJobLogoUpload = (urls: string[]) => {
    setNewJob({...newJob, companyLogo: urls[0] || ''});
  };
  
  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Connectez-vous pour ajouter une entreprise');
      router.push('/login');
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBusiness,
          logo: newBusiness.logo || ''
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        if (user.role === 'super_admin') {
          toast.success('✅ Entreprise ajoutée et publiée directement !');
        } else {
          toast.success('📝 Entreprise ajoutée avec succès ! En attente de validation par un administrateur.', {
            duration: 5000,
            icon: '⏳'
          });
        }
        setShowBusinessForm(false);
        setNewBusiness({
          businessName: '', category: 'commerce', description: '',
          phone: '', whatsapp: '', location: '', city: '', logo: '', images: []
        });
        fetchBusinesses();
      } else {
        toast.error(data.error || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Connectez-vous pour publier une offre');
      router.push('/login');
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newJob,
          requirements: newJob.requirements.split(',').map(r => r.trim())
        })
      });
      
      if (res.ok) {
        toast.success('Offre publiée avec succès !');
        setShowJobForm(false);
        setNewJob({
          title: '', companyName: '', description: '', requirements: '',
          location: '', salary: '', contractType: 'CDI', deadline: '', companyLogo: ''
        });
        fetchJobs();
      } else {
        toast.error('Erreur');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Connectez-vous pour vendre un produit');
      router.push('/login');
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseInt(newProduct.price)
        })
      });
      
      if (res.ok) {
        toast.success('Produit ajouté avec succès !');
        setShowProductForm(false);
        setNewProduct({
          title: '', description: '', price: '', category: 'produit', condition: 'neuf', images: []
        });
        fetchProducts();
      } else {
        toast.error('Erreur');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setSubmitting(false);
    }
  };
  
  const categories = [
    { value: 'all', label: 'Toutes' },
    { value: 'agriculture', label: '🌾 Agriculture' },
    { value: 'commerce', label: '🛒 Commerce' },
    { value: 'services', label: '💼 Services' },
    { value: 'tech', label: '💻 Tech' },
    { value: 'artisanat', label: '🎨 Artisanat' },
    { value: 'restauration', label: '🍽️ Restauration' }
  ];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">💰 Espace Économique Bangang</h1>
        <p className="text-green-100">
          Annuaire des entreprises, offres d'emploi et marketplace communautaire
        </p>
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher une entreprise, un produit, une offre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <Button onClick={() => {
          fetchBusinesses();
          fetchJobs();
          fetchProducts();
        }}>
          🔍 Rechercher
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        <button
          onClick={() => setActiveTab('businesses')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'businesses' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          🏪 Annuaire ({businesses.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'jobs' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          💼 Offres d'emploi ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'marketplace' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          🛍️ Marketplace ({products.length})
        </button>
      </div>
      
      {/* Bannière d'information pour les membres */}
      {user && user.role !== 'super_admin' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏳</span>
            <div>
              <h3 className="font-semibold text-blue-800">Validation en attente</h3>
              <p className="text-sm text-blue-600">
                Les entreprises que vous ajoutez seront visibles par les administrateurs pour validation. 
                Une fois approuvées, elles apparaîtront publiquement dans l'annuaire.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* ==================== ENTREPRISES ==================== */}
      {activeTab === 'businesses' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => setShowBusinessForm(!showBusinessForm)}>
              {showBusinessForm ? 'Annuler' : '+ Ajouter mon entreprise'}
            </Button>
          </div>
          
          {showBusinessForm && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Nouvelle entreprise</h2>
              
              {user && user.role !== 'super_admin' && (
                <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                  <p className="text-sm text-yellow-800">
                    ⏳ <span className="font-semibold">Information :</span> Votre entreprise sera soumise à validation par un administrateur avant d'être publiée.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleCreateBusiness} className="space-y-4">
                <Input
                  label="Nom de l'entreprise *"
                  required
                  value={newBusiness.businessName}
                  onChange={(e) => setNewBusiness({...newBusiness, businessName: e.target.value})}
                />
                
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie *</label>
                  <select
                    required
                    value={newBusiness.category}
                    onChange={(e) => setNewBusiness({...newBusiness, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {categories.filter(c => c.value !== 'all').map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={newBusiness.description}
                    onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Téléphone *"
                    required
                    value={newBusiness.phone}
                    onChange={(e) => setNewBusiness({...newBusiness, phone: e.target.value})}
                  />
                  <Input
                    label="WhatsApp"
                    value={newBusiness.whatsapp}
                    onChange={(e) => setNewBusiness({...newBusiness, whatsapp: e.target.value})}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Ville *"
                    required
                    value={newBusiness.city}
                    onChange={(e) => setNewBusiness({...newBusiness, city: e.target.value})}
                  />
                  <Input
                    label="Localisation *"
                    required
                    value={newBusiness.location}
                    onChange={(e) => setNewBusiness({...newBusiness, location: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Logo de l'entreprise</label>
                  <ImageUpload
                    onImagesUploaded={handleBusinessLogoUpload}
                    multiple={false}
                    maxImages={1}
                    existingImages={newBusiness.logo ? [newBusiness.logo] : []}
                    folder="businesses/logos"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Photos de l'entreprise</label>
                  <ImageUpload
                    onImagesUploaded={handleBusinessImagesUpload}
                    multiple={true}
                    maxImages={5}
                    existingImages={newBusiness.images}
                    folder="businesses/gallery"
                  />
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 Astuce : Pour être mis en avant, passez à l'offre Premium (25 000 FCFA/an)
                  </p>
                </div>
                
                <Button type="submit" disabled={submitting}>
                  {submitting 
                    ? 'Ajout...' 
                    : user?.role === 'super_admin' 
                      ? '✅ Publier directement' 
                      : '📝 Soumettre à validation'}
                </Button>
              </form>
            </Card>
          )}
          
          {/* Liste des entreprises */}
          {businesses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">Aucune entreprise pour le moment</p>
              {user && (
                <Button 
                  onClick={() => setShowBusinessForm(true)} 
                  className="mt-4"
                >
                  + Ajouter la première entreprise
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <div 
                  key={business._id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/business/${business._id}`)}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition h-full">
                    {/* Image de couverture */}
                    <div className="relative h-48 overflow-hidden">
                      {business.images && business.images[0] ? (
                        <img 
                          src={business.images[0]} 
                          alt={business.businessName}
                          className="w-full h-full object-cover"
                        />
                      ) : business.logo && business.logo !== '/default-business.png' ? (
                        <img 
                          src={business.logo} 
                          alt={business.businessName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-green-500 to-teal-500"></div>
                      )}
                      
                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {business.isSponsored && (
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                            Sponsor
                          </span>
                        )}
                        {business.isVerified && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            Vérifié
                          </span>
                        )}
                      </div>
                      
                      {/* Logo superposé */}
                      <div className="absolute -bottom-6 left-4">
                        <div className="bg-white rounded-full p-1 shadow-lg">
                          {business.logo && business.logo !== '/default-business.png' ? (
                            <img 
                              src={business.logo} 
                              alt={business.businessName}
                              className="w-14 h-14 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-teal-500"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 pt-8">
                      <h3 className="font-bold text-lg line-clamp-1">{business.businessName}</h3>
                      <p className="text-green-600 text-sm">{business.category}</p>
                      <p className="text-gray-500 text-sm">{business.city}</p>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{business.description}</p>
                      <div className="flex gap-2 mt-4">
                        <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                          <a href={`tel:${business.phone}`} className="block">
                            <Button size="sm" variant="secondary" className="w-full">📞 Appeler</Button>
                          </a>
                        </div>
                        {business.whatsapp && (
                          <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                            <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block">
                              <Button size="sm" className="w-full bg-green-600">💬 WhatsApp</Button>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* ==================== OFFRES D'EMPLOI ==================== */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => setShowJobForm(!showJobForm)}>
              {showJobForm ? 'Annuler' : '+ Publier une offre'}
            </Button>
          </div>
          
          {showJobForm && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Nouvelle offre d'emploi</h2>
              <form onSubmit={handleCreateJob} className="space-y-4">
                <Input 
                  label="Titre du poste *" 
                  required 
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})} 
                />
                
                <Input 
                  label="Nom de l'entreprise *" 
                  required 
                  value={newJob.companyName}
                  onChange={(e) => setNewJob({...newJob, companyName: e.target.value})} 
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Logo de l'entreprise</label>
                  <ImageUpload
                    onImagesUploaded={handleJobLogoUpload}
                    multiple={false}
                    maxImages={1}
                    existingImages={newJob.companyLogo ? [newJob.companyLogo] : []}
                    folder="jobs/logos"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg" 
                  />
                </div>
                
                <Input 
                  label="Prérequis (séparés par des virgules)" 
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} 
                />
                
                <Input 
                  label="Localisation *" 
                  required 
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})} 
                />
                
                <Input 
                  label="Salaire" 
                  value={newJob.salary}
                  onChange={(e) => setNewJob({...newJob, salary: e.target.value})} 
                />
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type de contrat *</label>
                  <select 
                    value={newJob.contractType} 
                    onChange={(e) => setNewJob({...newJob, contractType: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option>CDI</option>
                    <option>CDD</option>
                    <option>stage</option>
                    <option>freelance</option>
                  </select>
                </div>
                
                <Input 
                  type="date" 
                  label="Date limite" 
                  value={newJob.deadline}
                  onChange={(e) => setNewJob({...newJob, deadline: e.target.value})} 
                />
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">📢 Publication payante : 15 000 FCFA</p>
                </div>
                
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Publication...' : '✅ Publier (15 000 FCFA)'}
                </Button>
              </form>
            </Card>
          )}
          
          {jobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">Aucune offre d'emploi</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job._id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {job.companyLogo && (
                        <img src={job.companyLogo} className="w-16 h-16 rounded-full object-cover" />
                      )}
                      <div>
                        <h3 className="font-bold text-xl">{job.title}</h3>
                        <p className="text-gray-600">{job.companyName} • {job.location}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{job.contractType}</span>
                          {job.salary && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{job.salary}</span>}
                        </div>
                        <p className="text-gray-600 mt-3">{job.description.substring(0, 200)}...</p>
                      </div>
                    </div>
                    <Button>Postuler</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* ==================== MARKETPLACE ==================== */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => setShowProductForm(!showProductForm)}>
              {showProductForm ? 'Annuler' : '+ Vendre un produit'}
            </Button>
          </div>
          
          {showProductForm && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Nouveau produit</h2>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <Input 
                  label="Titre *" 
                  required 
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({...newProduct, title: e.target.value})} 
                />
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg" 
                  />
                </div>
                
                <Input 
                  type="number" 
                  label="Prix (FCFA) *" 
                  required 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
                />
                
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie *</label>
                  <select 
                    value={newProduct.category} 
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="produit">Produit</option>
                    <option value="service">Service</option>
                    <option value="location">Location</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">État</label>
                  <select 
                    value={newProduct.condition} 
                    onChange={(e) => setNewProduct({...newProduct, condition: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option>neuf</option>
                    <option>comme neuf</option>
                    <option>très bon</option>
                    <option>bon</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Photos du produit *</label>
                  <ImageUpload
                    onImagesUploaded={handleProductImagesUpload}
                    multiple={true}
                    maxImages={5}
                    existingImages={newProduct.images}
                    folder="products"
                  />
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">📢 Publication : 5 000 FCFA | Sponsoring : 25 000 FCFA</p>
                </div>
                
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Ajout...' : '✅ Publier (5 000 FCFA)'}
                </Button>
              </form>
            </Card>
          )}
          
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">Aucun produit</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-xl transition">
                  <div className="relative h-48 bg-gray-200">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-green-500 to-teal-500"></div>
                    )}
                    {product.isSponsored && (
                      <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">⭐ Sponsor</span>
                    )}
                    {product.images && product.images.length > 1 && (
                      <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        +{product.images.length - 1}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <p className="text-green-700 font-bold text-xl">{product.price.toLocaleString()} FCFA</p>
                    <p className="text-gray-500 text-sm mt-1">État: {product.condition}</p>
                    <p className="text-gray-500 text-sm">{product.description.substring(0, 100)}...</p>
                    <Button size="sm" className="mt-3 w-full">Contacter</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}