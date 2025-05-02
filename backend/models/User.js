import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: { type: Boolean, default: false },
  verificationotp: { type: Number },
  resetPasswordotp: { type: Number }, // Password reset token
  resetPasswordExpires: { type: Date }, // Token expiration time
});

const User = mongoose.model("User", userSchema);
export default User;
