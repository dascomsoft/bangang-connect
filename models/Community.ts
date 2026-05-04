import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['city', 'country'],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    trim: true
  },
  region: {
    type: String,
    enum: [
      'Centre',
      'Littoral',
      'Ouest',
      'Nord-Ouest',
      'Sud-Ouest',
      'Adamaoua',
      'Est',
      'Nord',
      'Extrême-Nord',
      'Sud'
    ],
    required: function(this: any) {
      return this.type === 'city';
    }
  },
  description: {
    type: String,
    default: ''
  },
  chiefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Community || mongoose.model('Community', CommunitySchema);