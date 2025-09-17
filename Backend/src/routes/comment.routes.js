const express = require("express");
const {
  addComment,
  getCommentsByCampaign,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:campaignId", authenticate, addComment);
router.get("/:campaignId", getCommentsByCampaign);
router.put("/:id", authenticate, updateComment);
router.delete("/:id", authenticate, deleteComment);

module.exports = router;
