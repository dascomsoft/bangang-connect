
// import mongoose from 'mongoose';

// const SectorRequestSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   sectorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Sector',
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'approved', 'rejected'],
//     default: 'pending'
//   },
//   message: {
//     type: String,
//     default: ''
//   },
//   respondedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   respondedAt: {
//     type: Date
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const SectorRequest = mongoose.models.SectorRequest || mongoose.model('SectorRequest', SectorRequestSchema);
// export default SectorRequest;














































import mongoose from 'mongoose';

const SectorRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    default: ''
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SectorRequest = mongoose.models.SectorRequest || mongoose.model('SectorRequest', SectorRequestSchema);
export default SectorRequest;