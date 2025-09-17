const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  getProfile,
  logout,
  refreshToken,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/authMiddleware");
const { validateRequest } = require("../middlewares/validateRequest");
const { authLimiter } = require("../middlewares/rateLimitMiddleware");

const router = express.Router();

// Registration validation
const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  body("role")
    .optional()
    .isIn(["user", "ngo"])
    .withMessage("Invalid role specified"),
];

// Login validation
const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Password validation
const passwordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

// Auth routes with validation and rate limiting
router.post(
  "/register",
  authLimiter,
  registerValidation,
  validateRequest,
  register
);
router.post("/login", authLimiter, loginValidation, validateRequest, login);
router.post("/logout", authenticate, logout);
router.post("/refresh-token", refreshToken);

// Password management
router.put(
  "/update-password",
  authenticate,
  passwordValidation,
  validateRequest,
  updatePassword
);
router.post(
  "/forgot-password",
  authLimiter,
  [body("email").isEmail().withMessage("Please enter a valid email")],
  validateRequest,
  forgotPassword
);
router.post(
  "/reset-password/:token",
  authLimiter,
  [
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  validateRequest,
  resetPassword
);

// Profile routes
router.get("/me", authenticate, getProfile);

module.exports = router;
