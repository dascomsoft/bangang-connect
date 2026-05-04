import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    sparse: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1/default-avatar.png'
  },
  role: {
    type: String,
    enum: ['super_admin', 'village_chief', 'community_chief', 'sector_president', 'member'],
    default: 'member'
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  sectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  },
  strikes: {
    type: Number,
    default: 0
  },
  isRestricted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);