'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { 
  FiPhone, FiArrowLeft, FiEdit, FiTrash2, FiMapPin,
  FiPackage, FiTag, FiHeart, FiEye
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

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
  sellerId: { 
    _id: string;
    name: string; 
    photo: string;
    phone?: string;
    whatsapp?: string;
  } | string;
  ownerId?: string;
  location?: string;
  createdAt: string;
  views: number;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchUser();
    fetchProduct();
  }, []);

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      
      if (!res.ok) {
        toast.error('Produit non trouvé');
        router.push('/business');
        return;
      }
      
      const data = await res.json();
      console.log('Product data:', data); // 🔍 Debug
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const isOwner = (): boolean => {
    if (!user || !product) return false;
    if (user.role === 'super_admin') return true;
    
    const sellerId = typeof product.sellerId === 'string' 
      ? product.sellerId 
      : product.sellerId?._id;
    
    return product.ownerId === user._id || sellerId === user._id;
  };

  const handleDelete = async () => {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    
    try {
      const res = await fetch(`/api/products/${product?._id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Produit supprimé');
        router.push('/business');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: `${product?.title} - ${product?.price.toLocaleString()} FCFA`,
          url: url,
        });
      } catch (err) {
        console.log('Partage annulé');
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Lien copié !');
    }
  };

  const getSellerName = (): string => {
    if (!product) return 'Anonyme';
    if (typeof product.sellerId === 'string') return 'Vendeur';
    return product.sellerId?.name || 'Vendeur';
  };

  const getSellerPhoto = (): string | null => {
    if (!product) return null;
    if (typeof product.sellerId === 'string') return null;
    return product.sellerId?.photo || null;
  };

  const getConditionColor = (condition: string): string => {
    const colors: Record<string, string> = {
      'neuf': 'bg-green-100 text-green-700',
      'comme neuf': 'bg-blue-100 text-blue-700',
      'très bon': 'bg-emerald-100 text-emerald-700',
      'bon': 'bg-yellow-100 text-yellow-700',
    };
    return colors[condition] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
        <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F0E8] gap-4">
        <FiPackage className="text-6xl text-[#C9A96E]/40" />
        <p className="font-sans text-[#1A1712]/60">Produit non trouvé</p>
        <Button onClick={() => router.push('/business')} className="bg-[#C9A96E] text-[#0D0B07]">
          Retour aux produits
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F0E8] font-sans">
      {/* Header */}
      <div className="bg-white border-b border-[#C9A96E]/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#1A1712]/60 hover:text-[#C9A96E] transition-colors"
          >
            <FiArrowLeft size={20} />
            <span className="text-sm">Retour</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-sm border border-[#C9A96E]/30 rounded-lg hover:bg-[#C9A96E]/10 transition-colors"
            >
              🔗 Partager
            </button>
            {isOwner() && (
              <>
                <button
                  onClick={() => router.push(`/business?tab=marketplace&edit=${product._id}`)}
                  className="p-2 bg-[#EDE9DF] hover:bg-[#C9A96E]/20 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <FiTrash2 size={16} className="text-red-600" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Colonne gauche : Images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative bg-white rounded-2xl border border-[#C9A96E]/10 overflow-hidden aspect-square">
              {product.images && product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#C9A96E]/10 to-[#C9A96E]/5 flex items-center justify-center">
                  <FiPackage size={64} className="text-[#C9A96E]/30" />
                </div>
              )}
              
              {product.isSponsored && (
                <span className="absolute top-4 left-4 bg-[#C9A96E] text-[#0D0B07] text-sm px-3 py-1.5 rounded-full font-semibold shadow-lg">
                  ⭐ Sponsor
                </span>
              )}
            </div>

            {/* Miniatures */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/30' 
                        : 'border-white hover:border-[#C9A96E]/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne droite : Infos */}
          <div className="space-y-6">
            
            {/* Infos produit */}
            <div className="bg-white rounded-2xl border border-[#C9A96E]/10 p-6 md:p-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-medium bg-[#EDE9DF] text-[#1A1712]/70 px-2 py-1 rounded flex items-center gap-1">
                  <FiTag size={12} />
                  {product.category}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getConditionColor(product.condition)}`}>
                  {product.condition}
                </span>
              </div>

              {/* Titre */}
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1712] mb-4">
                {product.title}
              </h1>

              {/* Prix */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-sans text-3xl md:text-4xl font-bold text-[#C9A96E]">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-lg text-[#1A1712]/50">FCFA</span>
              </div>

              {/* Description */}
              <div className="border-t border-[#C9A96E]/10 pt-6 mb-6">
                <h2 className="font-serif text-lg font-bold text-[#1A1712] mb-3">📝 Description</h2>
                <p className="text-[#1A1712]/70 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              {/* Vendeur */}
              <div className="flex items-center gap-3 p-4 bg-[#F4F0E8] rounded-xl">
                {getSellerPhoto() ? (
                  <img
                    src={getSellerPhoto()!}
                    alt={getSellerName()}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center">
                    <FiHeart size={16} className="text-[#C9A96E]" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-[#1A1712]">{getSellerName()}</p>
                  <p className="text-xs text-[#1A1712]/50">Vendeur</p>
                </div>
              </div>
            </div>

            {/* 📞 CONTACTS - Affichage simple */}
            <div className="bg-white rounded-2xl border border-[#C9A96E]/10 p-6">
              <h2 className="font-serif text-lg font-bold text-[#1A1712] mb-4">📞 Contacts</h2>
              
              <div className="space-y-3">
                {/* Téléphone */}
                {product.phone ? (
                  <a
                    href={`tel:${product.phone}`}
                    className="flex items-center gap-3 px-5 py-3 bg-[#F4F0E8] border border-[#C9A96E]/10 rounded-xl hover:border-[#C9A96E] hover:bg-white transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center group-hover:bg-[#C9A96E]/20 transition-colors">
                      <FiPhone size={18} className="text-[#C9A96E]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">Téléphone</p>
                      <p className="text-sm font-semibold text-[#1A1712]">{product.phone}</p>
                    </div>
                    <FiPhone size={16} className="text-[#C9A96E]" />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-3 bg-white border border-[#C9A96E]/10 rounded-xl opacity-50">
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center">
                      <FiPhone size={18} className="text-[#C9A96E]/40" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">Téléphone</p>
                      <p className="text-sm text-[#1A1712]/40">Non renseigné</p>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {product.whatsapp ? (
                  <a
                    href={`https://wa.me/${product.whatsapp}?text=Bonjour, je suis intéressé(e) par votre produit "${product.title}"`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl hover:bg-[#25D366]/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <FaWhatsapp size={18} className="text-[#25D366]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-sm font-semibold text-[#25D366]">{product.whatsapp}</p>
                    </div>
                    <FaWhatsapp size={16} className="text-[#25D366]" />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-3 bg-white border border-[#C9A96E]/10 rounded-xl opacity-50">
                    <div className="w-10 h-10 rounded-full bg-[#EDE9DF] flex items-center justify-center">
                      <FaWhatsapp size={18} className="text-[#C9A96E]/40" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1A1712]/50 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-sm text-[#1A1712]/40">Non renseigné</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {product.phone && (
                  <a href={`tel:${product.phone}`} className="block">
                    <Button className="w-full bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                      <FiPhone size={16} className="mr-2" />
                      Appeler
                    </Button>
                  </a>
                )}
                {product.whatsapp && (
                  <a 
                    href={`https://wa.me/${product.whatsapp}?text=Bonjour, je suis intéressé(e) par "${product.title}"`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-[#25D366] text-white hover:bg-[#20B859]">
                      <FaWhatsapp size={16} className="mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 text-xs text-[#1A1712]/40">
              <span className="flex items-center gap-1">
                <FiEye size={12} />
                {product.views || 0} vues
              </span>
              <span>•</span>
              <span>Publié le {formatDate(product.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}