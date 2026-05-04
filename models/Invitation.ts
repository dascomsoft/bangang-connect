import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    trim: true
  },
  sectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  role: {
    type: String,
    enum: ['sector_president', 'member'],
    default: 'sector_president'
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'expired'],
    default: 'pending'
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Invitation || mongoose.model('Invitation', InvitationSchema);