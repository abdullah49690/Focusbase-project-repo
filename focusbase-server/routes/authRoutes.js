
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const rateLimit = require("express-rate-limit");
const { validateRegister } = require("../middleware/validateMiddleware");

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // 5 failed attempts allowed
    message: {
        success: false,
        message: "Too many login attempts, please try again after 10 minutes",
    },
});

router.post("/register", validateRegister, registerUser);

router.post("/login", loginLimiter, loginUser);

module.exports = router;
