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














































// // app/business/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import Card from '@/components/ui/Card';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import ImageUpload from '@/components/ui/ImageUpload';
// import { toast } from 'react-hot-toast';
// import { 
//   FiBriefcase, FiMapPin, FiPhone, FiMail, FiStar, 
//   FiShield, FiTrendingUp, FiUsers, FiClock, FiAward,
//   FiSearch, FiFilter, FiPlus, FiX, FiCheck, FiHeart
// } from 'react-icons/fi';
// import { FaWhatsapp, FaStore, FaBuilding, FaUtensils } from 'react-icons/fa';

// // Composant SectionLabel
// function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
//   return (
//     <div className="flex items-center gap-3 mb-5">
//       <div className={`w-8 h-px ${light ? 'bg-[#C9A96E]/70' : 'bg-[#C9A96E]'}`} />
//       <span className={`font-sans text-[10px] font-medium tracking-[0.28em] uppercase ${light ? 'text-[#C9A96E]/85' : 'text-[#C9A96E]'}`}>
//         {children}
//       </span>
//     </div>
//   );
// }

// // Types
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
//   const [scrollY, setScrollY] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
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
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     window.addEventListener('scroll', () => setScrollY(window.scrollY));
//     return () => {
//       window.removeEventListener('resize', checkMobile);
//       window.removeEventListener('scroll', () => setScrollY(window.scrollY));
//     };
//   }, []);
  
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
  
//   // const fetchBusinesses = async () => {
//   //   try {
//   //     const res = await fetch(`/api/businesses?category=${selectedCategory}&search=${searchTerm}`);
//   //     const data = await res.json();
//   //     const approvedBusinesses = data.filter((b: Business) => b.status === 'approved');
//   //     setBusinesses(approvedBusinesses);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };




// const fetchBusinesses = async () => {
//   try {
//     const res = await fetch(`/api/businesses?category=${selectedCategory}&search=${searchTerm}`);
//     const data = await res.json();
//     // 🔥 SOLUTION RAPIDE : Afficher toutes les entreprises (sans filtre)
//     // const approvedBusinesses = data.filter((b: Business) => b.status === 'approved');
//     // setBusinesses(approvedBusinesses);
//     setBusinesses(data);
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
//           logo: newBusiness.logo || ''
//         })
//       });
      
//       const data = await res.json();
      
//       if (res.ok) {
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
//       <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
//         <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }
  
//   return (
//     <main className="w-full overflow-x-hidden bg-[#F4F0E8] font-sans">
//       {/* ══════════════════════════════════════════════════════
//           HERO — sans ombre
//       ══════════════════════════════════════════════════════ */}
//       <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D0B07] to-[#1A1712]">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#C9A96E]/20 blur-3xl" />
//           <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#C9A96E]/10 blur-3xl" />
//         </div>
        
//         <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-16">
//           <div className="text-center max-w-4xl mx-auto">
//             <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
//               <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
//               <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
//                 Développement économique
//               </span>
//             </div>
            
//             <h1 className="font-serif text-[clamp(48px,10vw,80px)] font-bold text-[#F5EDD8] leading-[1.05] tracking-[-0.02em] mb-6">
//               Espace <em className="italic text-[#C9A96E]">Économique</em>
//             </h1>
            
//             <div className="flex items-center justify-center gap-4 mb-8">
//               <div className="w-16 h-px bg-[#C9A96E]/60" />
//               <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/60">
//                 Annuaire · Emplois · Marketplace
//               </span>
//               <div className="w-16 h-px bg-[#C9A96E]/60" />
//             </div>
            
//             <p className="font-sans text-[16px] text-[#F5EDD8]/70 leading-relaxed max-w-3xl mx-auto">
//               Découvrez les entreprises, opportunités d'emploi et produits de la communauté Bangang.
//               Soutenons l'économie locale ensemble.
//             </p>
//           </div>
//         </div>
//       </section>
      
//       {/* ══════════════════════════════════════════════════════
//           RECHERCHE ET FILTRES
//       ══════════════════════════════════════════════════════ */}
//       <section className="py-8 px-5 sm:px-8 lg:px-20 bg-[#F4F0E8] border-b border-[#C9A96E]/10">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="flex-1 w-full">
//               <div className="relative">
//                 <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1712]/40" />
//                 <input
//                   type="text"
//                   placeholder="Rechercher une entreprise, un produit, une offre..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-11 pr-4 py-3 bg-white border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] transition-colors font-sans text-[14px]"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3 w-full md:w-auto">
//               <div className="relative">
//                 <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40 text-sm" />
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="pl-9 pr-8 py-3 bg-white border border-[#C9A96E]/20 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#C9A96E] font-sans text-[14px]"
//                 >
//                   {categories.map(cat => (
//                     <option key={cat.value} value={cat.value}>{cat.label}</option>
//                   ))}
//                 </select>
//               </div>
//               <Button
//                 onClick={() => {
//                   fetchBusinesses();
//                   fetchJobs();
//                   fetchProducts();
//                 }}
//                 className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
//               >
//                 Rechercher
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* ══════════════════════════════════════════════════════
//           TABS
//       ══════════════════════════════════════════════════════ */}
//       <section className="px-5 sm:px-8 lg:px-20 pt-8 bg-[#F4F0E8]">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-wrap gap-2 border-b border-[#C9A96E]/20">
//             <button
//               onClick={() => setActiveTab('businesses')}
//               className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-sans text-[14px] font-medium transition-all duration-300 ${
//                 activeTab === 'businesses' 
//                   ? 'bg-[#C9A96E] text-[#0D0B07]' 
//                   : 'text-[#1A1712]/60 hover:text-[#C9A96E]'
//               }`}
//             >
//               <FaStore size={14} />
//               Annuaire ({businesses.length})
//             </button>
//             <button
//               onClick={() => setActiveTab('jobs')}
//               className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-sans text-[14px] font-medium transition-all duration-300 ${
//                 activeTab === 'jobs' 
//                   ? 'bg-[#C9A96E] text-[#0D0B07]' 
//                   : 'text-[#1A1712]/60 hover:text-[#C9A96E]'
//               }`}
//             >
//               <FiBriefcase size={14} />
//               Offres d'emploi ({jobs.length})
//             </button>
//             <button
//               onClick={() => setActiveTab('marketplace')}
//               className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-sans text-[14px] font-medium transition-all duration-300 ${
//                 activeTab === 'marketplace' 
//                   ? 'bg-[#C9A96E] text-[#0D0B07]' 
//                   : 'text-[#1A1712]/60 hover:text-[#C9A96E]'
//               }`}
//             >
//               🛍️
//               Marketplace ({products.length})
//             </button>
//           </div>
//         </div>
//       </section>
      
//       {/* ══════════════════════════════════════════════════════
//           CONTENU PRINCIPAL
//       ══════════════════════════════════════════════════════ */}
//       <section className="py-8 px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Bannière d'information pour les membres */}
//           {user && user.role !== 'super_admin' && (
//             <div className="mb-6 bg-[#EDE9DF] border-l-4 border-[#C9A96E] p-4 rounded-r-xl">
//               <div className="flex items-start gap-3">
//                 <span className="text-2xl">⏳</span>
//                 <div>
//                   <h3 className="font-serif font-semibold text-[#1A1712]">Validation en attente</h3>
//                   <p className="font-sans text-sm text-[#1A1712]/60">
//                     Les entreprises que vous ajoutez seront visibles par les administrateurs pour validation. 
//                     Une fois approuvées, elles apparaîtront publiquement dans l'annuaire.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* ==================== ENTREPRISES ==================== */}
//           {activeTab === 'businesses' && (
//             <div className="space-y-6">
//               <div className="flex justify-end">
//                 <Button 
//                   onClick={() => setShowBusinessForm(!showBusinessForm)}
//                   className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
//                 >
//                   <FiPlus className="mr-2" />
//                   {showBusinessForm ? 'Annuler' : 'Ajouter mon entreprise'}
//                 </Button>
//               </div>
              
//               {showBusinessForm && (
//                 <div className="bg-white rounded-2xl p-6 border border-[#C9A96E]/20 shadow-sm">
//                   <h2 className="font-serif text-2xl font-bold text-[#1A1712] mb-4">Nouvelle entreprise</h2>
                  
//                   {user && user.role !== 'super_admin' && (
//                     <div className="mb-4 bg-[#EDE9DF] border-l-4 border-[#C9A96E] p-3">
//                       <p className="font-sans text-sm text-[#1A1712]/70">
//                         ⏳ <span className="font-semibold">Information :</span> Votre entreprise sera soumise à validation par un administrateur avant d'être publiée.
//                       </p>
//                     </div>
//                   )}
                  
//                   <form onSubmit={handleCreateBusiness} className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <Input
//                         label="Nom de l'entreprise *"
//                         required
//                         value={newBusiness.businessName}
//                         onChange={(e) => setNewBusiness({...newBusiness, businessName: e.target.value})}
//                         className="border-[#C9A96E]/20 focus:border-[#C9A96E]"
//                       />
                      
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Catégorie *</label>
//                         <select
//                           required
//                           value={newBusiness.category}
//                           onChange={(e) => setNewBusiness({...newBusiness, category: e.target.value})}
//                           className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
//                         >
//                           {categories.filter(c => c.value !== 'all').map(cat => (
//                             <option key={cat.value} value={cat.value}>{cat.label}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Description *</label>
//                       <textarea
//                         required
//                         rows={3}
//                         value={newBusiness.description}
//                         onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})}
//                         className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
//                       />
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <Input
//                         label="Téléphone *"
//                         required
//                         value={newBusiness.phone}
//                         onChange={(e) => setNewBusiness({...newBusiness, phone: e.target.value})}
//                       />
//                       <Input
//                         label="WhatsApp"
//                         value={newBusiness.whatsapp}
//                         onChange={(e) => setNewBusiness({...newBusiness, whatsapp: e.target.value})}
//                       />
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <Input
//                         label="Ville *"
//                         required
//                         value={newBusiness.city}
//                         onChange={(e) => setNewBusiness({...newBusiness, city: e.target.value})}
//                       />
//                       <Input
//                         label="Localisation *"
//                         required
//                         value={newBusiness.location}
//                         onChange={(e) => setNewBusiness({...newBusiness, location: e.target.value})}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Logo de l'entreprise</label>
//                       <ImageUpload
//                         onImagesUploaded={handleBusinessLogoUpload}
//                         multiple={false}
//                         maxImages={1}
//                         existingImages={newBusiness.logo ? [newBusiness.logo] : []}
//                         folder="businesses/logos"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Photos de l'entreprise</label>
//                       <ImageUpload
//                         onImagesUploaded={handleBusinessImagesUpload}
//                         multiple={true}
//                         maxImages={5}
//                         existingImages={newBusiness.images}
//                         folder="businesses/gallery"
//                       />
//                     </div>
                    
//                     <div className="bg-[#EDE9DF] p-3 rounded-lg">
//                       <p className="font-sans text-sm text-[#1A1712]/70">
//                         💡 Astuce : Pour être mis en avant, passez à l'offre Premium (25 000 FCFA/an)
//                       </p>
//                     </div>
                    
//                     <Button 
//                       type="submit" 
//                       disabled={submitting}
//                       className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A] w-full"
//                     >
//                       {submitting 
//                         ? 'Ajout...' 
//                         : user?.role === 'super_admin' 
//                           ? '✅ Publier directement' 
//                           : '📝 Soumettre à validation'}
//                     </Button>
//                   </form>
//                 </div>
//               )}
              
//               {/* Liste des entreprises */}
//               {businesses.length === 0 ? (
//                 <div className="text-center py-16 bg-white rounded-2xl border border-[#C9A96E]/10">
//                   <FaStore className="text-5xl text-[#C9A96E]/40 mx-auto mb-4" />
//                   <p className="font-sans text-[#1A1712]/60">Aucune entreprise pour le moment</p>
//                   {user && (
//                     <Button 
//                       onClick={() => setShowBusinessForm(true)} 
//                       className="mt-4 bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
//                     >
//                       + Ajouter la première entreprise
//                     </Button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {businesses.map((business) => (
//                     <div 
//                       key={business._id}
//                       className="cursor-pointer group bg-white rounded-2xl overflow-hidden border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-500 hover:-translate-y-1"
//                       onClick={() => router.push(`/business/${business._id}`)}
//                     >
//                       <div className="relative h-48 overflow-hidden">
//                         {business.images && business.images[0] ? (
//                           <img 
//                             src={business.images[0]} 
//                             alt={business.businessName}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                           />
//                         ) : business.logo && business.logo !== '/default-business.png' ? (
//                           <img 
//                             src={business.logo} 
//                             alt={business.businessName}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5" />
//                         )}
                        
//                         <div className="absolute top-3 right-3 flex gap-1">
//                           {business.isSponsored && (
//                             <span className="bg-[#C9A96E] text-[#0D0B07] text-xs px-2 py-1 rounded-full font-semibold">⭐ Sponsor</span>
//                           )}
//                           {business.isVerified && (
//                             <span className="bg-[#1A1712] text-white text-xs px-2 py-1 rounded-full font-semibold">✓ Vérifié</span>
//                           )}
//                         </div>
                        
//                         <div className="absolute -bottom-6 left-4">
//                           <div className="bg-white rounded-full p-1 shadow-lg">
//                             {business.logo && business.logo !== '/default-business.png' ? (
//                               <img 
//                                 src={business.logo} 
//                                 alt={business.businessName}
//                                 className="w-14 h-14 rounded-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#DFC08A]" />
//                             )}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="p-4 pt-8">
//                         <h3 className="font-serif text-lg font-bold text-[#1A1712] line-clamp-1">{business.businessName}</h3>
//                         <p className="font-sans text-sm text-[#C9A96E] mt-1">{business.category}</p>
//                         <p className="font-sans text-sm text-[#1A1712]/50 mt-1">{business.city}</p>
//                         <p className="font-sans text-sm text-[#1A1712]/60 mt-2 line-clamp-2">{business.description}</p>
//                         <div className="flex gap-2 mt-4">
//                           <div className="flex-1" onClick={(e) => e.stopPropagation()}>
//                             <a href={`tel:${business.phone}`} className="block">
//                               <Button size="sm" variant="secondary" className="w-full border-[#C9A96E]/30 text-[#1A1712] hover:border-[#C9A96E]">
//                                 📞 Appeler
//                               </Button>
//                             </a>
//                           </div>
//                           {business.whatsapp && (
//                             <div className="flex-1" onClick={(e) => e.stopPropagation()}>
//                               <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block">
//                                 <Button size="sm" className="w-full bg-[#25D366] text-white hover:bg-[#20B859]">
//                                   💬 WhatsApp
//                                 </Button>
//                               </a>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
          
//           {/* ==================== OFFRES D'EMPLOI ==================== */}
//           {activeTab === 'jobs' && (
//             <div className="space-y-6">
//               <div className="flex justify-end">
//                 <Button 
//                   onClick={() => setShowJobForm(!showJobForm)}
//                   className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
//                 >
//                   <FiPlus className="mr-2" />
//                   {showJobForm ? 'Annuler' : 'Publier une offre'}
//                 </Button>
//               </div>
              
//               {showJobForm && (
//                 <div className="bg-white rounded-2xl p-6 border border-[#C9A96E]/20 shadow-sm">
//                   <h2 className="font-serif text-2xl font-bold text-[#1A1712] mb-4">Nouvelle offre d'emploi</h2>
//                   <form onSubmit={handleCreateJob} className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <Input 
//                         label="Titre du poste *" 
//                         required 
//                         value={newJob.title}
//                         onChange={(e) => setNewJob({...newJob, title: e.target.value})} 
//                       />
//                       <Input 
//                         label="Nom de l'entreprise *" 
//                         required 
//                         value={newJob.companyName}
//                         onChange={(e) => setNewJob({...newJob, companyName: e.target.value})} 
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Logo de l'entreprise</label>
//                       <ImageUpload
//                         onImagesUploaded={handleJobLogoUpload}
//                         multiple={false}
//                         maxImages={1}
//                         existingImages={newJob.companyLogo ? [newJob.companyLogo] : []}
//                         folder="jobs/logos"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Description *</label>
//                       <textarea 
//                         required 
//                         rows={3} 
//                         value={newJob.description}
//                         onChange={(e) => setNewJob({...newJob, description: e.target.value})}
//                         className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans" 
//                       />
//                     </div>
                    
//                     <Input 
//                       label="Prérequis (séparés par des virgules)" 
//                       value={newJob.requirements}
//                       onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} 
//                     />
                    
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <Input 
//                         label="Localisation *" 
//                         required 
//                         value={newJob.location}
//                         onChange={(e) => setNewJob({...newJob, location: e.target.value})} 
//                       />
//                       <Input 
//                         label="Salaire" 
//                         value={newJob.salary}
//                         onChange={(e) => setNewJob({...newJob, salary: e.target.value})} 
//                       />
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Type de contrat *</label>
//                         <select 
//                           value={newJob.contractType} 
//                           onChange={(e) => setNewJob({...newJob, contractType: e.target.value})}
//                           className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
//                         >
//                           <option>CDI</option>
//                           <option>CDD</option>
//                           <option>stage</option>
//                           <option>freelance</option>
//                         </select>
//                       </div>
//                       <Input 
//                         type="date" 
//                         label="Date limite" 
//                         value={newJob.deadline}
//                         onChange={(e) => setNewJob({...newJob, deadline: e.target.value})} 
//                       />
//                     </div>
                    
//                     <div className="bg-[#EDE9DF] p-3 rounded-lg">
//                       <p className="font-sans text-sm text-[#1A1712]/70">📢 Publication payante : 15 000 FCFA</p>
//                     </div>
                    
//                     <Button 
//                       type="submit" 
//                       disabled={submitting}
//                       className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A] w-full"
//                     >
//                       {submitting ? 'Publication...' : '✅ Publier (15 000 FCFA)'}
//                     </Button>
//                   </form>
//                 </div>
//               )}
              
//               {jobs.length === 0 ? (
//                 <div className="text-center py-16 bg-white rounded-2xl border border-[#C9A96E]/10">
//                   <FiBriefcase className="text-5xl text-[#C9A96E]/40 mx-auto mb-4" />
//                   <p className="font-sans text-[#1A1712]/60">Aucune offre d'emploi</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {jobs.map((job) => (
//                     <div key={job._id} className="bg-white rounded-2xl p-6 border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300">
//                       <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//                         <div className="flex gap-4 flex-1">
//                           {job.companyLogo && (
//                             <img src={job.companyLogo} className="w-16 h-16 rounded-full object-cover" />
//                           )}
//                           <div>
//                             <h3 className="font-serif text-xl font-bold text-[#1A1712]">{job.title}</h3>
//                             <p className="font-sans text-[#1A1712]/60">{job.companyName} • {job.location}</p>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                               <span className="text-xs bg-[#EDE9DF] text-[#1A1712]/70 px-2 py-1 rounded">{job.contractType}</span>
//                               {job.salary && <span className="text-xs bg-[#EDE9DF] text-[#1A1712]/70 px-2 py-1 rounded">{job.salary}</span>}
//                             </div>
//                             <p className="font-sans text-[#1A1712]/60 mt-3">{job.description.substring(0, 200)}...</p>
//                           </div>
//                         </div>
//                         <Button className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A] whitespace-nowrap">Postuler</Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
          
//           {/* ==================== MARKETPLACE ==================== */}
//           {activeTab === 'marketplace' && (
//             <div className="space-y-6">
//               <div className="flex justify-end">
//                 <Button 
//                   onClick={() => setShowProductForm(!showProductForm)}
//                   className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
//                 >
//                   <FiPlus className="mr-2" />
//                   {showProductForm ? 'Annuler' : 'Vendre un produit'}
//                 </Button>
//               </div>
              
//               {showProductForm && (
//                 <div className="bg-white rounded-2xl p-6 border border-[#C9A96E]/20 shadow-sm">
//                   <h2 className="font-serif text-2xl font-bold text-[#1A1712] mb-4">Nouveau produit</h2>
//                   <form onSubmit={handleCreateProduct} className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <Input 
//                         label="Titre *" 
//                         required 
//                         value={newProduct.title}
//                         onChange={(e) => setNewProduct({...newProduct, title: e.target.value})} 
//                       />
//                       <Input 
//                         type="number" 
//                         label="Prix (FCFA) *" 
//                         required 
//                         value={newProduct.price}
//                         onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Description *</label>
//                       <textarea 
//                         required 
//                         rows={3} 
//                         value={newProduct.description}
//                         onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
//                         className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans" 
//                       />
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Catégorie *</label>
//                         <select 
//                           value={newProduct.category} 
//                           onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
//                           className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
//                         >
//                           <option value="produit">Produit</option>
//                           <option value="service">Service</option>
//                           <option value="location">Location</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">État</label>
//                         <select 
//                           value={newProduct.condition} 
//                           onChange={(e) => setNewProduct({...newProduct, condition: e.target.value})}
//                           className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
//                         >
//                           <option>neuf</option>
//                           <option>comme neuf</option>
//                           <option>très bon</option>
//                           <option>bon</option>
//                         </select>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Photos du produit *</label>
//                       <ImageUpload
//                         onImagesUploaded={handleProductImagesUpload}
//                         multiple={true}
//                         maxImages={5}
//                         existingImages={newProduct.images}
//                         folder="products"
//                       />
//                     </div>
                    
//                     <div className="bg-[#EDE9DF] p-3 rounded-lg">
//                       <p className="font-sans text-sm text-[#1A1712]/70">📢 Publication : 5 000 FCFA | Sponsoring : 25 000 FCFA</p>
//                     </div>
                    
//                     <Button 
//                       type="submit" 
//                       disabled={submitting}
//                       className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A] w-full"
//                     >
//                       {submitting ? 'Ajout...' : '✅ Publier (5 000 FCFA)'}
//                     </Button>
//                   </form>
//                 </div>
//               )}
              
//               {products.length === 0 ? (
//                 <div className="text-center py-16 bg-white rounded-2xl border border-[#C9A96E]/10">
//                   🛍️
//                   <p className="font-sans text-[#1A1712]/60 mt-2">Aucun produit</p>
//                 </div>
//               ) : (
//                 <div className="grid md:grid-cols-3 gap-6">
//                   {products.map((product) => (
//                     <div key={product._id} className="group bg-white rounded-2xl overflow-hidden border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-500 hover:-translate-y-1">
//                       <div className="relative h-48 bg-[#EDE9DF] overflow-hidden">
//                         {product.images && product.images[0] ? (
//                           <img 
//                             src={product.images[0]} 
//                             alt={product.title}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center text-4xl">
//                             🛍️
//                           </div>
//                         )}
//                         {product.isSponsored && (
//                           <span className="absolute top-3 right-3 bg-[#C9A96E] text-[#0D0B07] text-xs px-2 py-1 rounded-full font-semibold">⭐ Sponsor</span>
//                         )}
//                         {product.images && product.images.length > 1 && (
//                           <span className="absolute bottom-3 right-3 bg-[#1A1712]/80 text-white text-xs px-2 py-1 rounded-full">
//                             +{product.images.length - 1}
//                           </span>
//                         )}
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-serif text-lg font-bold text-[#1A1712] line-clamp-1">{product.title}</h3>
//                         <p className="font-sans text-xl font-bold text-[#C9A96E] mt-1">{product.price.toLocaleString()} FCFA</p>
//                         <p className="font-sans text-sm text-[#1A1712]/50 mt-1">État: {product.condition}</p>
//                         <p className="font-sans text-sm text-[#1A1712]/60 mt-2 line-clamp-2">{product.description}</p>
//                         <Button size="sm" className="mt-3 w-full bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">Contacter</Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }







































































































































































// app/business/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUpload from '@/components/ui/ImageUpload';
import { toast } from 'react-hot-toast';
import { 
  FiBriefcase, FiMapPin, FiPhone, FiMail, FiStar, 
  FiShield, FiTrendingUp, FiUsers, FiClock, FiAward,
  FiSearch, FiFilter, FiPlus, FiX, FiCheck, FiHeart,
  FiEdit, FiTrash2, FiEye, FiExternalLink, FiArrowRight
} from 'react-icons/fi';
import { FaWhatsapp, FaStore, FaBuilding, FaUtensils } from 'react-icons/fa';

// Composant SectionLabel
function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-8 h-px ${light ? 'bg-[#C9A96E]/70' : 'bg-[#C9A96E]'}`} />
      <span className={`font-sans text-[10px] font-medium tracking-[0.28em] uppercase ${light ? 'text-[#C9A96E]/85' : 'text-[#C9A96E]'}`}>
        {children}
      </span>
    </div>
  );
}

// Types
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
  ownerId: { name: string; photo: string } | string;
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
  email: string;
  phone: string;
  whatsapp: string;
  ownerId?: string;
  companyId?: string;
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
  phone: string;
  whatsapp: string;
  sellerId: { name: string; photo: string } | string;
  ownerId?: string;
}

export default function BusinessPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('businesses');
  const [user, setUser] = useState<any>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
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
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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
    companyLogo: '',
    email: '',
    phone: '',
    whatsapp: ''
  });
  
  // Formulaire produit
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: 'produit',
    condition: 'neuf',
    images: [] as string[],
    phone: '',
    whatsapp: ''
  });
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', () => setScrollY(window.scrollY));
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', () => setScrollY(window.scrollY));
    };
  }, []);
  
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
      setBusinesses(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  // ✅ CORRIGÉ : fetchJobs utilise le searchTerm normalement
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
    if (editingProduct) {
      setEditingProduct({...editingProduct, images: [...editingProduct.images, ...urls]});
    } else {
      setNewProduct({...newProduct, images: [...newProduct.images, ...urls]});
    }
  };
  
  const handleJobLogoUpload = (urls: string[]) => {
    if (editingJob) {
      setEditingJob({...editingJob, companyLogo: urls[0] || ''});
    } else {
      setNewJob({...newJob, companyLogo: urls[0] || ''});
    }
  };
  
  // ═══════════════ CRUD ENTREPRISE (inchangé) ═══════════════
  
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
  
  // ═══════════════ CRUD EMPLOI ═══════════════
  
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
          requirements: newJob.requirements.split(',').map(r => r.trim()).filter(r => r)
        })
      });
      
      if (res.ok) {
        toast.success('Offre publiée avec succès !');
        setShowJobForm(false);
        setNewJob({
          title: '', companyName: '', description: '', requirements: '',
          location: '', salary: '', contractType: 'CDI', deadline: '', companyLogo: '',
          email: '', phone: '', whatsapp: ''
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

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      companyName: job.companyName,
      description: job.description,
      requirements: job.requirements.join(', '),
      location: job.location,
      salary: job.salary,
      contractType: job.contractType,
      deadline: job.deadline,
      companyLogo: job.companyLogo || '',
      email: job.email || '',
      phone: job.phone || '',
      whatsapp: job.whatsapp || ''
    });
    setShowJobForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ CORRIGÉ : URL avec query param ?id=
  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`/api/jobs?id=${editingJob._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newJob,
          requirements: newJob.requirements.split(',').map(r => r.trim()).filter(r => r)
        })
      });
      
      if (res.ok) {
        toast.success('Offre modifiée avec succès !');
        setShowJobForm(false);
        setEditingJob(null);
        setNewJob({
          title: '', companyName: '', description: '', requirements: '',
          location: '', salary: '', contractType: 'CDI', deadline: '', companyLogo: '',
          email: '', phone: '', whatsapp: ''
        });
        fetchJobs();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Erreur lors de la modification');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ CORRIGÉ : URL avec query param ?id=
  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette offre d\'emploi ?')) return;
    
    try {
      const res = await fetch(`/api/jobs?id=${jobId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Offre supprimée avec succès');
        fetchJobs();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    }
  };

  const cancelJobEdit = () => {
    setEditingJob(null);
    setShowJobForm(false);
    setNewJob({
      title: '', companyName: '', description: '', requirements: '',
      location: '', salary: '', contractType: 'CDI', deadline: '', companyLogo: '',
      email: '', phone: '', whatsapp: ''
    });
  };
  
  // ═══════════════ CRUD PRODUIT ═══════════════
  
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
          title: '', description: '', price: '', category: 'produit', condition: 'neuf', 
          images: [], phone: '', whatsapp: ''
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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      condition: product.condition,
      images: product.images || [],
      phone: product.phone || '',
      whatsapp: product.whatsapp || ''
    });
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ CORRIGÉ : URL avec query param ?id=
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products?id=${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseInt(newProduct.price)
        })
      });
      
      if (res.ok) {
        toast.success('Produit modifié avec succès !');
        setShowProductForm(false);
        setEditingProduct(null);
        setNewProduct({
          title: '', description: '', price: '', category: 'produit', condition: 'neuf', 
          images: [], phone: '', whatsapp: ''
        });
        fetchProducts();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Erreur lors de la modification');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ CORRIGÉ : URL avec query param ?id=
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    
    try {
      const res = await fetch(`/api/products?id=${productId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Produit supprimé avec succès');
        fetchProducts();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    }
  };

  const cancelProductEdit = () => {
    setEditingProduct(null);
    setShowProductForm(false);
    setNewProduct({
      title: '', description: '', price: '', category: 'produit', condition: 'neuf', 
      images: [], phone: '', whatsapp: ''
    });
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

  // Fonction utilitaire pour vérifier si l'utilisateur est propriétaire
  const isOwner = (item: any): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    
    const ownerId = typeof item.ownerId === 'string' ? item.ownerId : item.ownerId?._id;
    const sellerId = typeof item.sellerId === 'string' ? item.sellerId : item.sellerId?._id;
    
    return ownerId === user._id || sellerId === user._id;
  };

  const isJobOwner = (job: Job): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return job.ownerId === user._id || job.companyId === user._id;
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
        <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <main className="w-full overflow-x-hidden bg-[#F4F0E8] font-sans">
      {/* ══════════════════════════════════════════════════════
          HERO — sans ombre
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D0B07] to-[#1A1712]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#C9A96E]/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#C9A96E]/10 blur-3xl" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-md bg-[#C9A96E]/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]/90">
                Développement économique
              </span>
            </div>
            
            <h1 className="font-serif text-[clamp(48px,10vw,80px)] font-bold text-[#F5EDD8] leading-[1.05] tracking-[-0.02em] mb-6">
              Espace <em className="italic text-[#C9A96E]">Économique</em>
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-[#C9A96E]/60" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C9A96E]/60">
                Annuaire · Emplois · Marketplace
              </span>
              <div className="w-16 h-px bg-[#C9A96E]/60" />
            </div>
            
            <p className="font-sans text-[16px] text-[#F5EDD8]/70 leading-relaxed max-w-3xl mx-auto">
              Découvrez les entreprises, opportunités d'emploi et produits de la communauté Bangang.
              Soutenons l'économie locale ensemble.
            </p>
          </div>
        </div>
      </section>
      
      {/* ══════════════════════════════════════════════════════
          RECHERCHE ET FILTRES
      ══════════════════════════════════════════════════════ */}
      <section className="py-8 px-5 sm:px-8 lg:px-20 bg-[#F4F0E8] border-b border-[#C9A96E]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1712]/40" />
                <input
                  type="text"
                  placeholder="Rechercher une entreprise, un produit, une offre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] transition-colors font-sans text-[14px]"
                />
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40 text-sm" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-9 pr-8 py-3 bg-white border border-[#C9A96E]/20 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#C9A96E] font-sans text-[14px]"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <Button
                onClick={() => {
                  fetchBusinesses();
                  fetchJobs();
                  fetchProducts();
                }}
                className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
              >
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* ══════════════════════════════════════════════════════
          TABS
      ══════════════════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-20 pt-8 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 border-b border-[#C9A96E]/20">
            <button
              onClick={() => setActiveTab('businesses')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-sans text-[14px] font-medium transition-all duration-300 ${
                activeTab === 'businesses' 
                  ? 'bg-[#C9A96E] text-[#0D0B07]' 
                  : 'text-[#1A1712]/60 hover:text-[#C9A96E]'
              }`}
            >
              <FaStore size={14} />
              Annuaire ({businesses.length})
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-sans text-[14px] font-medium transition-all duration-300 ${
                activeTab === 'jobs' 
                  ? 'bg-[#C9A96E] text-[#0D0B07]' 
                  : 'text-[#1A1712]/60 hover:text-[#C9A96E]'
              }`}
            >
              <FiBriefcase size={14} />
              Offres d'emploi ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-sans text-[14px] font-medium transition-all duration-300 ${
                activeTab === 'marketplace' 
                  ? 'bg-[#C9A96E] text-[#0D0B07]' 
                  : 'text-[#1A1712]/60 hover:text-[#C9A96E]'
              }`}
            >
              🛍️
              Marketplace ({products.length})
            </button>
          </div>
        </div>
      </section>
      
      {/* ══════════════════════════════════════════════════════
          CONTENU PRINCIPAL
      ══════════════════════════════════════════════════════ */}
      <section className="py-8 px-5 sm:px-8 lg:px-20 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto">
          
          {/* Bannière d'information pour les membres */}
          {user && user.role !== 'super_admin' && (
            <div className="mb-6 bg-[#EDE9DF] border-l-4 border-[#C9A96E] p-4 rounded-r-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏳</span>
                <div>
                  <h3 className="font-serif font-semibold text-[#1A1712]">Validation en attente</h3>
                  <p className="font-sans text-sm text-[#1A1712]/60">
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
                <Button 
                  onClick={() => setShowBusinessForm(!showBusinessForm)}
                  className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
                >
                  <FiPlus className="mr-2" />
                  {showBusinessForm ? 'Annuler' : 'Ajouter mon entreprise'}
                </Button>
              </div>
              
              {showBusinessForm && (
                <div className="bg-white rounded-2xl p-6 border border-[#C9A96E]/20 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#1A1712] mb-4">Nouvelle entreprise</h2>
                  
                  {user && user.role !== 'super_admin' && (
                    <div className="mb-4 bg-[#EDE9DF] border-l-4 border-[#C9A96E] p-3">
                      <p className="font-sans text-sm text-[#1A1712]/70">
                        ⏳ <span className="font-semibold">Information :</span> Votre entreprise sera soumise à validation par un administrateur avant d'être publiée.
                      </p>
                    </div>
                  )}
                  
                  <form onSubmit={handleCreateBusiness} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Nom de l'entreprise *"
                        required
                        value={newBusiness.businessName}
                        onChange={(e) => setNewBusiness({...newBusiness, businessName: e.target.value})}
                        className="border-[#C9A96E]/20 focus:border-[#C9A96E]"
                      />
                      
                      <div>
                        <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Catégorie *</label>
                        <select
                          required
                          value={newBusiness.category}
                          onChange={(e) => setNewBusiness({...newBusiness, category: e.target.value})}
                          className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
                        >
                          {categories.filter(c => c.value !== 'all').map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Description *</label>
                      <textarea
                        required
                        rows={3}
                        value={newBusiness.description}
                        onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})}
                        className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
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
                      <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Logo de l'entreprise</label>
                      <ImageUpload
                        onImagesUploaded={handleBusinessLogoUpload}
                        multiple={false}
                        maxImages={1}
                        existingImages={newBusiness.logo ? [newBusiness.logo] : []}
                        folder="businesses/logos"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Photos de l'entreprise</label>
                      <ImageUpload
                        onImagesUploaded={handleBusinessImagesUpload}
                        multiple={true}
                        maxImages={5}
                        existingImages={newBusiness.images}
                        folder="businesses/gallery"
                      />
                    </div>
                    
                    <div className="bg-[#EDE9DF] p-3 rounded-lg">
                      <p className="font-sans text-sm text-[#1A1712]/70">
                        💡 Astuce : Pour être mis en avant, passez à l'offre Premium (25 000 FCFA/an)
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A] w-full"
                    >
                      {submitting 
                        ? 'Ajout...' 
                        : user?.role === 'super_admin' 
                          ? '✅ Publier directement' 
                          : '📝 Soumettre à validation'}
                    </Button>
                  </form>
                </div>
              )}
              
              {/* Liste des entreprises */}
              {businesses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#C9A96E]/10">
                  <FaStore className="text-5xl text-[#C9A96E]/40 mx-auto mb-4" />
                  <p className="font-sans text-[#1A1712]/60">Aucune entreprise pour le moment</p>
                  {user && (
                    <Button 
                      onClick={() => setShowBusinessForm(true)} 
                      className="mt-4 bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
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
                      className="cursor-pointer group bg-white rounded-2xl overflow-hidden border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-500 hover:-translate-y-1"
                      onClick={() => router.push(`/business/${business._id}`)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        {business.images && business.images[0] ? (
                          <img 
                            src={business.images[0]} 
                            alt={business.businessName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : business.logo && business.logo !== '/default-business.png' ? (
                          <img 
                            src={business.logo} 
                            alt={business.businessName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5" />
                        )}
                        
                        <div className="absolute top-3 right-3 flex gap-1">
                          {business.isSponsored && (
                            <span className="bg-[#C9A96E] text-[#0D0B07] text-xs px-2 py-1 rounded-full font-semibold">⭐ Sponsor</span>
                          )}
                          {business.isVerified && (
                            <span className="bg-[#1A1712] text-white text-xs px-2 py-1 rounded-full font-semibold">✓ Vérifié</span>
                          )}
                        </div>
                        
                        <div className="absolute -bottom-6 left-4">
                          <div className="bg-white rounded-full p-1 shadow-lg">
                            {business.logo && business.logo !== '/default-business.png' ? (
                              <img 
                                src={business.logo} 
                                alt={business.businessName}
                                className="w-14 h-14 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#DFC08A]" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 pt-8">
                        <h3 className="font-serif text-lg font-bold text-[#1A1712] line-clamp-1">{business.businessName}</h3>
                        <p className="font-sans text-sm text-[#C9A96E] mt-1">{business.category}</p>
                        <p className="font-sans text-sm text-[#1A1712]/50 mt-1">{business.city}</p>
                        <p className="font-sans text-sm text-[#1A1712]/60 mt-2 line-clamp-2">{business.description}</p>
                        <div className="flex gap-2 mt-4">
                          <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                            <a href={`tel:${business.phone}`} className="block">
                              <Button size="sm" variant="secondary" className="w-full border-[#C9A96E]/30 text-[#1A1712] hover:border-[#C9A96E]">
                                📞 Appeler
                              </Button>
                            </a>
                          </div>
                          {business.whatsapp && (
                            <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                              <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block">
                                <Button size="sm" className="w-full bg-[#25D366] text-white hover:bg-[#20B859]">
                                  💬 WhatsApp
                                </Button>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
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
                <Button 
                  onClick={() => {
                    if (editingJob) {
                      cancelJobEdit();
                    } else {
                      setShowJobForm(!showJobForm);
                    }
                  }}
                  className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
                >
                  <FiPlus className="mr-2" />
                  {showJobForm ? 'Annuler' : editingJob ? 'Annuler la modification' : 'Publier une offre'}
                </Button>
              </div>
              
              {showJobForm && (
                <div className="bg-white rounded-2xl p-6 border border-[#C9A96E]/20 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#1A1712] mb-4">
                    {editingJob ? 'Modifier l\'offre d\'emploi' : 'Nouvelle offre d\'emploi'}
                  </h2>
                  <form onSubmit={editingJob ? handleUpdateJob : handleCreateJob} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
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
                    </div>
                    
                    <div>
                      <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Logo de l'entreprise</label>
                      <ImageUpload
                        onImagesUploaded={handleJobLogoUpload}
                        multiple={false}
                        maxImages={1}
                        existingImages={editingJob?.companyLogo ? [editingJob.companyLogo] : newJob.companyLogo ? [newJob.companyLogo] : []}
                        folder="jobs/logos"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Description *</label>
                      <textarea 
                        required 
                        rows={3} 
                        value={newJob.description}
                        onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                        className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans" 
                      />
                    </div>
                    
                    <Input 
                      label="Prérequis (séparés par des virgules)" 
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} 
                    />
                    
                    <div className="grid md:grid-cols-2 gap-4">
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
                    </div>

                    {/* Coordonnées de contact */}
                    <div className="bg-[#EDE9DF] p-4 rounded-xl border border-[#C9A96E]/20">
                      <h3 className="font-sans text-sm font-semibold text-[#1A1712] mb-3">📞 Coordonnées de contact (visibles sur l'offre)</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input 
                          label="Email *" 
                          type="email"
                          required 
                          value={newJob.email}
                          onChange={(e) => setNewJob({...newJob, email: e.target.value})}
                          placeholder="contact@entreprise.com"
                        />
                        <Input 
                          label="Téléphone *" 
                          required 
                          value={newJob.phone}
                          onChange={(e) => setNewJob({...newJob, phone: e.target.value})}
                          placeholder="+237 6XX XXX XXX"
                        />
                        <Input 
                          label="WhatsApp" 
                          value={newJob.whatsapp}
                          onChange={(e) => setNewJob({...newJob, whatsapp: e.target.value})}
                          placeholder="+237 6XX XXX XXX"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Type de contrat *</label>
                        <select 
                          value={newJob.contractType} 
                          onChange={(e) => setNewJob({...newJob, contractType: e.target.value})}
                          className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
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
                    </div>
                    
                    <div className="bg-[#EDE9DF] p-3 rounded-lg">
                      <p className="font-sans text-sm text-[#1A1712]/70">📢 Publication payante : 15 000 FCFA</p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A] w-full"
                    >
                      {submitting 
                        ? (editingJob ? 'Modification...' : 'Publication...') 
                        : (editingJob ? '✅ Modifier l\'offre' : '✅ Publier (15 000 FCFA)')}
                    </Button>
                  </form>
                </div>
              )}
              
              {jobs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#C9A96E]/10">
                  <FiBriefcase className="text-5xl text-[#C9A96E]/40 mx-auto mb-4" />
                  <p className="font-sans text-[#1A1712]/60">Aucune offre d'emploi</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div 
                      key={job._id} 
                      className="group bg-white rounded-2xl p-6 border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 relative cursor-pointer"
                      onClick={() => router.push(`/business/jobs/${job._id}`)}
                    >
                      {/* Indicateur cliquable */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiExternalLink size={16} className="text-[#C9A96E]" />
                      </div>

                      {/* Boutons Modifier/Supprimer pour le propriétaire */}
                      {isJobOwner(job) && (
                        <div className="absolute top-4 right-12 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditJob(job);
                            }}
                            className="p-2 bg-[#EDE9DF] hover:bg-[#C9A96E]/20 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <FiEdit size={16} className="text-[#1A1712]" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteJob(job._id);
                            }}
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <FiTrash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      )}
                      
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex gap-4 flex-1">
                          {job.companyLogo && (
                            <img src={job.companyLogo} className="w-16 h-16 rounded-full object-cover" alt={job.companyName} />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif text-xl font-bold text-[#1A1712] group-hover:text-[#C9A96E] transition-colors">{job.title}</h3>
                              <FiArrowRight size={14} className="text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                            </div>
                            <p className="font-sans text-[#1A1712]/60">{job.companyName} • {job.location}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-xs bg-[#EDE9DF] text-[#1A1712]/70 px-2 py-1 rounded">{job.contractType}</span>
                              {job.salary && <span className="text-xs bg-[#EDE9DF] text-[#1A1712]/70 px-2 py-1 rounded">{job.salary}</span>}
                              {job.isSponsored && <span className="text-xs bg-[#C9A96E] text-[#0D0B07] px-2 py-1 rounded font-semibold">⭐ Sponsor</span>}
                            </div>
                            <p className="font-sans text-[#1A1712]/60 mt-3 line-clamp-2">{job.description}</p>
                            
                            {/* Coordonnées de contact visibles */}
                            <div className="mt-4 p-4 bg-[#F4F0E8] rounded-xl border border-[#C9A96E]/10 space-y-2" onClick={(e) => e.stopPropagation()}>
                              <h4 className="font-sans text-xs font-semibold text-[#1A1712]/70 uppercase tracking-wider">📬 Contacter le recruteur</h4>
                              <div className="flex flex-wrap gap-3">
                                {job.email && (
                                  <a href={`mailto:${job.email}`} className="flex items-center gap-2 text-sm text-[#1A1712] hover:text-[#C9A96E] transition-colors">
                                    <FiMail size={14} />
                                    <span>{job.email}</span>
                                  </a>
                                )}
                                {job.phone && (
                                  <a href={`tel:${job.phone}`} className="flex items-center gap-2 text-sm text-[#1A1712] hover:text-[#C9A96E] transition-colors">
                                    <FiPhone size={14} />
                                    <span>{job.phone}</span>
                                  </a>
                                )}
                                {job.whatsapp && (
                                  <a href={`https://wa.me/${job.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#25D366] hover:text-[#20B859] transition-colors">
                                    <FaWhatsapp size={14} />
                                    <span>WhatsApp</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Lien vers détails */}
                      <div className="mt-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => router.push(`/business/jobs/${job._id}`)}
                          className="text-xs text-[#C9A96E] hover:text-[#1A1712] font-medium flex items-center gap-1 ml-auto transition-colors"
                        >
                          <FiEye size={12} />
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* ==================== MARKETPLACE ==================== */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button 
                  onClick={() => {
                    if (editingProduct) {
                      cancelProductEdit();
                    } else {
                      setShowProductForm(!showProductForm);
                    }
                  }}
                  className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
                >
                  <FiPlus className="mr-2" />
                  {showProductForm ? 'Annuler' : editingProduct ? 'Annuler la modification' : 'Vendre un produit'}
                </Button>
              </div>
              
              {showProductForm && (
                <div className="bg-white rounded-2xl p-6 border border-[#C9A96E]/20 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#1A1712] mb-4">
                    {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                  </h2>
                  <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input 
                        label="Titre *" 
                        required 
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({...newProduct, title: e.target.value})} 
                      />
                      <Input 
                        type="number" 
                        label="Prix (FCFA) *" 
                        required 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
                      />
                    </div>
                    
                    <div>
                      <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Description *</label>
                      <textarea 
                        required 
                        rows={3} 
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans" 
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">Catégorie *</label>
                        <select 
                          value={newProduct.category} 
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
                        >
                          <option value="produit">Produit</option>
                          <option value="service">Service</option>
                          <option value="location">Location</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-medium text-[#1A1712] mb-1">État</label>
                        <select 
                          value={newProduct.condition} 
                          onChange={(e) => setNewProduct({...newProduct, condition: e.target.value})}
                          className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans"
                        >
                          <option>neuf</option>
                          <option>comme neuf</option>
                          <option>très bon</option>
                          <option>bon</option>
                        </select>
                      </div>
                    </div>

                    {/* Coordonnées de contact */}
                    <div className="bg-[#EDE9DF] p-4 rounded-xl border border-[#C9A96E]/20">
                      <h3 className="font-sans text-sm font-semibold text-[#1A1712] mb-3">📞 Coordonnées de contact (visibles sur l'annonce)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input 
                          label="Téléphone *" 
                          required 
                          value={newProduct.phone}
                          onChange={(e) => setNewProduct({...newProduct, phone: e.target.value})}
                          placeholder="+237 6XX XXX XXX"
                        />
                        <Input 
                          label="WhatsApp" 
                          value={newProduct.whatsapp}
                          onChange={(e) => setNewProduct({...newProduct, whatsapp: e.target.value})}
                          placeholder="+237 6XX XXX XXX"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Photos du produit *</label>
                      <ImageUpload
                        onImagesUploaded={handleProductImagesUpload}
                        multiple={true}
                        maxImages={5}
                        existingImages={editingProduct ? editingProduct.images : newProduct.images}
                        folder="products"
                      />
                    </div>
                    
                    <div className="bg-[#EDE9DF] p-3 rounded-lg">
                      <p className="font-sans text-sm text-[#1A1712]/70">📢 Publication : 5 000 FCFA | Sponsoring : 25 000 FCFA</p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A] w-full"
                    >
                      {submitting 
                        ? (editingProduct ? 'Modification...' : 'Ajout...') 
                        : (editingProduct ? '✅ Modifier le produit' : '✅ Publier (5 000 FCFA)')}
                    </Button>
                  </form>
                </div>
              )}
              
              {products.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#C9A96E]/10">
                  🛍️
                  <p className="font-sans text-[#1A1712]/60 mt-2">Aucun produit</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div 
                      key={product._id} 
                      className="group bg-white rounded-2xl overflow-hidden border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-500 hover:-translate-y-1 relative cursor-pointer"
                      onClick={() => router.push(`/business/products/${product._id}`)}
                    >
                      
                      {/* Boutons Modifier/Supprimer pour le propriétaire */}
                      {isOwner(product) && (
                        <div className="absolute top-3 left-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProduct(product);
                            }}
                            className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-md transition-all"
                            title="Modifier"
                          >
                            <FiEdit size={14} className="text-[#1A1712]" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(product._id);
                            }}
                            className="p-1.5 bg-red-50/90 hover:bg-red-100 rounded-lg shadow-md transition-all"
                            title="Supprimer"
                          >
                            <FiTrash2 size={14} className="text-red-600" />
                          </button>
                        </div>
                      )}
                      
                      <div className="relative h-48 bg-[#EDE9DF] overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center text-4xl">
                            🛍️
                          </div>
                        )}
                        {product.isSponsored && (
                          <span className="absolute top-3 right-3 bg-[#C9A96E] text-[#0D0B07] text-xs px-2 py-1 rounded-full font-semibold">⭐ Sponsor</span>
                        )}
                        {product.images && product.images.length > 1 && (
                          <span className="absolute bottom-3 right-3 bg-[#1A1712]/80 text-white text-xs px-2 py-1 rounded-full">
                            +{product.images.length - 1}
                          </span>
                        )}
                        
                        {/* Overlay "Voir détails" au survol */}
                        <div className="absolute inset-0 bg-[#1A1712]/0 group-hover:bg-[#1A1712]/20 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                            <FiEye size={16} />
                            Voir détails
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg font-bold text-[#1A1712] line-clamp-1 group-hover:text-[#C9A96E] transition-colors">{product.title}</h3>
                        <p className="font-sans text-xl font-bold text-[#C9A96E] mt-1">{product.price.toLocaleString()} FCFA</p>
                        <p className="font-sans text-sm text-[#1A1712]/50 mt-1">État: {product.condition}</p>
                        <p className="font-sans text-sm text-[#1A1712]/60 mt-2 line-clamp-2">{product.description}</p>
                        
                        {/* Coordonnées de contact visibles */}
                        <div className="mt-3 pt-3 border-t border-[#C9A96E]/10 space-y-2" onClick={(e) => e.stopPropagation()}>
                          <div className="flex flex-wrap gap-2">
                            {product.phone && (
                              <a 
                                href={`tel:${product.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs text-[#1A1712] hover:text-[#C9A96E] bg-[#F4F0E8] px-2 py-1.5 rounded-lg transition-colors"
                              >
                                <FiPhone size={12} />
                                <span>Appeler</span>
                              </a>
                            )}
                            {product.whatsapp && (
                              <a 
                                href={`https://wa.me/${product.whatsapp}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs text-white bg-[#25D366] hover:bg-[#20B859] px-2 py-1.5 rounded-lg transition-colors"
                              >
                                <FaWhatsapp size={12} />
                                <span>WhatsApp</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Lien vers détails */}
                        <div className="mt-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => router.push(`/business/products/${product._id}`)}
                            className="text-xs text-[#C9A96E] hover:text-[#1A1712] font-medium flex items-center gap-1 mx-auto transition-colors"
                          >
                            <FiEye size={12} />
                            Voir les détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}