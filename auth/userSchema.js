const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Otp: {
    type: String,
    default: null  // To store the OTP
  },
  otpGeneratedAt: {
    type: Date,
    default: null  // Timestamp for when OTP is generated
  }
});

// Middleware to hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  // Only hash the password if it's new or modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password with hashed password (useful for login)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export User model
const User = mongoose.model('User', userSchema);
module.exports = User;