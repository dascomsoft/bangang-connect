import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  type: { type: String, enum: ['city', 'country'], required: true },
  country: { type: String, required: true, trim: true },
  city: { type: String, trim: true },
  region: { type: String },
  chiefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
});

const Community = mongoose.models.Community || mongoose.model('Community', CommunitySchema);
export default Community;