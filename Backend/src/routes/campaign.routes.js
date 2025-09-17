const express = require("express");
const { body, param, query } = require("express-validator");
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  featuredCampaigns,
  searchCampaigns,
  campaignStats,
  toggleCampaignStatus,
  donateToCompaign,
} = require("../controllers/campaign.controller");
const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  validateRequest,
  validateObjectId,
} = require("../middlewares/validateRequest");
const { donationLimiter } = require("../middlewares/rateLimitMiddleware");

const router = express.Router();

// Campaign validation rules
const campaignValidation = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Title must be between 10 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 50, max: 5000 })
    .withMessage("Description must be between 50 and 5000 characters"),
  body("goalAmount")
    .isFloat({ min: 100 })
    .withMessage("Goal amount must be at least 100"),
  body("category")
    .isIn([
      "education",
      "healthcare",
      "environment",
      "disaster-relief",
      "poverty",
      "animal-welfare",
      "other",
    ])
    .withMessage("Invalid category"),
  body("endDate")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("End date must be in the future");
      }
      return true;
    }),
];

// Campaign listing filters
const listingValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  query("category")
    .optional()
    .isIn([
      "education",
      "healthcare",
      "environment",
      "disaster-relief",
      "poverty",
      "animal-welfare",
      "other",
    ])
    .withMessage("Invalid category"),
  query("status")
    .optional()
    .isIn(["draft", "active", "paused", "completed", "cancelled"])
    .withMessage("Invalid status"),
];

// Create and manage campaigns
router.post(
  "/",
  authenticate,
  authorizeRoles("ngo"),
  campaignValidation,
  validateRequest,
  createCampaign
);

router.get("/", listingValidation, validateRequest, getCampaigns);

router.get("/featured", listingValidation, validateRequest, featuredCampaigns);

router.get(
  "/search",
  [
    query("q").trim().notEmpty().withMessage("Search query is required"),
    ...listingValidation,
  ],
  validateRequest,
  searchCampaigns
);

router.get(
  "/stats",
  authenticate,
  authorizeRoles("ngo", "admin", "super-admin"),
  campaignStats
);

router.get("/:id", validateObjectId, getCampaignById);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("ngo", "super-admin"),
  validateObjectId,
  campaignValidation,
  validateRequest,
  updateCampaign
);

router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles("ngo", "super-admin"),
  validateObjectId,
  [
    body("status")
      .isIn(["draft", "active", "paused", "completed", "cancelled"])
      .withMessage("Invalid status"),
  ],
  validateRequest,
  toggleCampaignStatus
);

router.post(
  "/:id/donate",
  authenticate,
  validateObjectId,
  donationLimiter,
  [
    body("amount")
      .isFloat({ min: 1 })
      .withMessage("Donation amount must be at least 1"),
  ],
  validateRequest,
  donateToCompaign
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("super-admin"),
  validateObjectId,
  deleteCampaign
);

module.exports = router;
