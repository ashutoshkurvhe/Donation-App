const User = require("../models/User");
const logger = require("../utils/logger");

// Get all users (admin only)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Only allow users to view their own profile unless admin
    if (
      req.user._id.toString() !== user._id.toString() &&
      req.user.role !== "super-admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this profile",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    // Don't allow role updates through this endpoint
    if (req.body.role) {
      return res.status(400).json({
        success: false,
        message: "Role cannot be updated through this endpoint",
      });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Only allow users to update their own profile unless admin
    if (
      req.user._id.toString() !== user._id.toString() &&
      req.user.role !== "super-admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this profile",
      });
    }

    // Update allowed fields
    const allowedFields = ["name", "avatar"];
    allowedFields.forEach((field) => {
      if (req.body[field]) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    logger.info(`User ${user._id} updated successfully`);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();
    logger.info(`User ${user._id} deleted successfully`);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
