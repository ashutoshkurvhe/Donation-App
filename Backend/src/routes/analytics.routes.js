const express = require("express");
const {
  getUserAnalytics,
  getNGOAnalytics,
} = require("../controllers/analytics.controller");
const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/user/:userId", authenticate, getUserAnalytics);
router.get(
  "/ngo/:ngoId",
  authenticate,
  authorizeRoles("ngo", "super-admin"),
  getNGOAnalytics
);

module.exports = router;
