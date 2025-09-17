const { validationResult } = require("express-validator");
const logger = require("../utils/logger");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn("Validation failed:", {
      path: req.path,
      method: req.method,
      errors: errors.array(),
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};

// Sanitize request body to prevent NoSQL injection
const sanitizeRequest = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        // Remove any MongoDB operators from string values
        req.body[key] = req.body[key].replace(/\$|\{|\}/g, "");
      }
    });
  }
  next();
};

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const objectId = req.params.id;
  if (objectId && !/^[0-9a-fA-F]{24}$/.test(objectId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  next();
};

module.exports = {
  validateRequest,
  sanitizeRequest,
  validateObjectId,
};
