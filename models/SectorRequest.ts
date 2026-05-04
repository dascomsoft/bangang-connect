import mongoose from 'mongoose';

const SectorRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 500
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.SectorRequest || mongoose.model('SectorRequest', SectorRequestSchema);