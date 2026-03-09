import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantName: { type: String, required: true },
  applicantContact: { type: String, required: true },
  resume: { type: String }, // Optional, could be URL or text
  message: { type: String },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);