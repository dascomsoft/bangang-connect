import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chatType: {
    type: String,
    enum: ['sector', 'community'],
    required: true,
    default: 'sector'
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'chatType'
  },
  // 🔥 NOUVEAUX CHAMPS POUR MODÉRATION
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deletedAt: {
    type: Date
  },
  reports: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  reportCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);