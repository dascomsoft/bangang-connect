import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['produit', 'service', 'location', 'immobilier', 'vehicule'],
    required: true
  },
  subCategory: {
    type: String
  },
  images: [{
    type: String
  }],
  location: {
    type: String
  },
  condition: {
    type: String,
    enum: ['neuf', 'comme neuf', 'très bon', 'bon', 'correct', 'à restaurer']
  },
  
  // 🆕 CHAMPS DE CONTACT AJOUTÉS
  phone: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    default: ''
  },
  
  isSponsored: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['disponible', 'vendu', 'reserve', 'expire'],
    default: 'disponible'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 jours
  }
});

ProductSchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);