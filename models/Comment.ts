import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad'
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  likes: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  is_reported: {
    type: Boolean,
    default: false
  },
  is_approved: {
    type: Boolean,
    default: true
  },
  reports: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);