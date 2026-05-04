import mongoose from 'mongoose';

const SectorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  presidentName: { type: String, required: true, trim: true },
  presidentPhone: { type: String, required: true, trim: true },
  presidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  membersCount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  createdBy: { type: String, enum: ['super_admin', 'user'], default: 'super_admin' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

SectorSchema.index({ name: 1, communityId: 1 }, { unique: true });

// Fonction simple pour mettre à jour le compteur
SectorSchema.pre('save', function() {
  this.membersCount = this.members.length;
  this.updatedAt = new Date();
});

const Sector = mongoose.models.Sector || mongoose.model('Sector', SectorSchema);
export default Sector;