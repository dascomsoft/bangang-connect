import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['sector_request', 'request_approved', 'request_rejected', 'new_event', 'new_comment', 'boost_expired'],
    required: true
  },
  title: String,
  content: String,
  actionUrl: String,
  is_read: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: Map,
    of: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);