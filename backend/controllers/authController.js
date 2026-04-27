const User = require("../models/User");
const generateToken = require("../utils/jwt");
const transporter = require("../config/mailer");

// 🔥 SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        otp,
        otpExpires: Date.now() + 2 * 60 * 1000,
      });
    } else {
      user.otp = otp;
      user.otpExpires = Date.now() + 2 * 60 * 1000;
      await user.save();
    }

    await transporter.sendMail({
      from: "your@gmail.com",
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "OTP failed", error: err.message });
  }
};

// 🔥 RESEND OTP
exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  user.otp = otp;
  user.otpExpires = Date.now() + 2 * 60 * 1000;
  await user.save();

  await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: email,
    subject: "Resend OTP",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP resent" });
};

// 🔥 VERIFY OTP + LOGIN
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  user.isVerified = true;
  await user.save();

  const token = generateToken(user._id);

  res.json({ token, user });
};