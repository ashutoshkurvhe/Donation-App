const logger = require("../utils/logger");

// Custom error class for API errors
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error details
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.id,
  });

  // Handle specific types of errors
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `Duplicate value for ${Object.keys(err.keyValue).join(", ")}`;
  }

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
};

module.exports = {
  APIError,
  errorHandler,
};
