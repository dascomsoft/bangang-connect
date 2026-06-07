import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String
  },
  contractType: {
    type: String,
    enum: ['CDI', 'CDD', 'stage', 'freelance', 'alternance', 'apprentissage'],
    required: true
  },
  experience: {
    type: String,
    enum: ['débutant', '1-2 ans', '3-5 ans', '5-10 ans', '10+ ans']
  },
  
  // 🆕 CHAMPS DE CONTACT AJOUTÉS
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    default: ''
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  isSponsored: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  applications: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    cv: String,
    appliedAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

JobSchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);