import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'driver', 'carpenter', 'painter', 'laborer'], default: 'user' },
  profileImage: { type: String }, // URL to profile image
  bio: { type: String },
  cnic: { type: String }, // CNIC number
  drivingLicence: { type: String }, // For drivers
  phone: { type: String },
  location: { type: String }, // District in Gilgit-Baltistan
  experience: { type: String }, // Years of experience
  skills: [{ type: String }], // Array of skills
  portfolioImages: [{ type: String }], // URLs to work / portfolio images
  verified: { type: Boolean, default: false }, // Verification status
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);