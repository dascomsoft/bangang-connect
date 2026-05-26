// models/Business.ts
import mongoose from 'mongoose';

const BusinessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String },
  location: { type: String, required: true },
  city: { type: String, required: true },
  logo: { type: String, default: '/default-business.png' },
  images: [{ type: String }],
  isSponsored: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Champs pour la validation
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  rejectionReason: { type: String }
}, { timestamps: true });

export default mongoose.models.Business || mongoose.model('Business', BusinessSchema);