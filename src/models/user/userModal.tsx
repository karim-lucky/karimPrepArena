import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },

  profileImage: {
    type: String,
  },

  phone: {
    type: String,
  },

  educationLevel: {
    type: String,
    enum: ['matric', 'intermediate', 'undergrad', 'postgrad'],
  },

  targetExams: {
    type: [String], // e.g., ['MDCAT', 'ECAT', 'NET']
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  lastLogin: {
    type: Date,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
  },

  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpires: {
    type: Date,
  },

  preferences: {
    notification: {
      type: Boolean,
      default: true,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
