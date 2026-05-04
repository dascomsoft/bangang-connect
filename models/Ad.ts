import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_sponsored: {
    type: Boolean,
    default: false
  },
  sponsor_expires_at: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);