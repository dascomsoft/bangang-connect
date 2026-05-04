import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad'
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['sector_creation', 'event_boost', 'ad_sponsor'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  reference: {
    type: String,
    unique: true
  },
  paymentMethod: {
    type: String,
    enum: ['orange_money', 'mtn_money', 'card', 'free'],
    default: 'free'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);