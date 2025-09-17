const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../utils/logger");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please provide a valid Bearer token",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.id) {
        return res.status(401).json({
          success: false,
          message: "Invalid token format",
        });
      }

      const user = await User.findById(decoded.id)
        .select("-password")
        .lean()
        .exec();

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found or access revoked",
        });
      }

      // Check if token was issued before password change
      if (
        user.passwordChangedAt &&
        decoded.iat < user.passwordChangedAt.getTime() / 1000
      ) {
        return res.status(401).json({
          success: false,
          message: "Password was changed. Please login again",
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      logger.error("JWT Verification failed:", jwtError);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    logger.error("Authentication middleware error:", error);
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient rights" });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorizeRoles,
};
