const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);