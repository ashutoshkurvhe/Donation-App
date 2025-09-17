const rateLimit = require("express-rate-limit");
const logger = require("../utils/logger");

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per window per IP
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json(options.message);
  },
});

// More strict limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 failed attempts per hour
  message: {
    success: false,
    message: "Too many login attempts, please try again later",
  },
  handler: (req, res, next, options) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json(options.message);
  },
});

// Donation endpoints limiter
const donationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 50, // max 50 donations per day
  message: {
    success: false,
    message: "Daily donation limit reached, please try again tomorrow",
  },
  handler: (req, res, next, options) => {
    logger.warn(`Donation rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json(options.message);
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
  donationLimiter,
};
