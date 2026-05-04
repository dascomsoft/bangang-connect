import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  sectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_boosted: {
    type: Boolean,
    default: false
  },
  boost_expires_at: {
    type: Date
  },

     participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 


  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);