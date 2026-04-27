const router = require("express").Router();
const ctrl = require("../controllers/authController"); // ✅ THIS WAS MISSING

// OTP routes
router.post("/send-otp", ctrl.sendOtp);
router.post("/verify-otp", ctrl.verifyOtp);
router.post("/resend-otp", ctrl.resendOtp);

module.exports = router;