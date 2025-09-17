const express = require("express");
const {
  approveNGO,
  rejectNGO,
  blockUser,
  unblockUser,
  removeCampaign,
  getPlatformAnalytics,
  getAllUsers,
  getAllNGOs,
  getFlaggedContent,
  sendSystemNotification,
  exportDataReport,
} = require("../controllers/admin.controller");
const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.put(
  "/ngo/:ngoId/approve",
  authenticate,
  authorizeRoles("super-admin"),
  approveNGO
);
router.put(
  "/ngo/:ngoId/reject",
  authenticate,
  authorizeRoles("super-admin"),
  rejectNGO
);

router.put(
  "/user/:userId/block",
  authenticate,
  authorizeRoles("super-admin"),
  blockUser
);
router.put(
  "/user/:userId/unblock",
  authenticate,
  authorizeRoles("super-admin"),
  unblockUser
);

router.delete(
  "/campaign/:campaignId",
  authenticate,
  authorizeRoles("super-admin"),
  removeCampaign
);

router.get(
  "/analytics",
  authenticate,
  authorizeRoles("super-admin"),
  getPlatformAnalytics
);

// New Admin Routes
router.get("/users", authenticate, authorizeRoles("super-admin"), getAllUsers);

router.get("/ngos", authenticate, authorizeRoles("super-admin"), getAllNGOs);

router.get(
  "/flagged-content",
  authenticate,
  authorizeRoles("super-admin"),
  getFlaggedContent
);

router.post(
  "/notifications",
  authenticate,
  authorizeRoles("super-admin"),
  sendSystemNotification
);

router.get(
  "/export",
  authenticate,
  authorizeRoles("super-admin"),
  exportDataReport
);

module.exports = router;
