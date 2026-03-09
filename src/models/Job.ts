import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Driver, Carpenter, Mason
  location: { type: String, required: true }, // Districts of Gilgit-Baltistan
  salary: { type: String }, // Optional
  contact: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);