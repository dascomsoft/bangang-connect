import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['business_sponsor', 'job_posting', 'product_sponsor', 'premium_ad'],
    required: true
  },
  duration: {
    type: Number, // en jours
    default: 30
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['orange_money', 'mtn_money', 'card', 'cash'],
    required: true
  },
  transactionId: {
    type: String,
    unique: true
  },
  receipt: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);