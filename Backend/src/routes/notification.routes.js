const express = require("express");
const {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notification.controller");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createNotification);
router.get("/", authenticate, getNotifications);
router.put("/:id/read", authenticate, markAsRead);
router.delete("/:id", authenticate, deleteNotification);

module.exports = router;
