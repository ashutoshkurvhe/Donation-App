const Comment = require("../models/Comment");

// Add comment
const addComment = async (req, res, next) => {
  try {
    const { campaignId, text } = req.body;
    const comment = await Comment.create({
      campaign: campaignId,
      user: req.user._id,
      text,
    });
    res.status(201).json({ success: true, comment });
  } catch (error) {
    next(error);
  }
};

// Get comments by campaign
const getCommentsByCampaign = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      campaign: req.params.campaignId,
    }).populate("user", "name");
    res.json({ success: true, comments });
  } catch (error) {
    next(error);
  }
};

// Update comment (owner only)
const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    comment.text = req.body.text;
    await comment.save();

    res.json({ success: true, comment });
  } catch (error) {
    next(error);
  }
};

// Delete comment (owner or admin)
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ message: "Not authorized" });

    await comment.deleteOne();
    res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  getCommentsByCampaign,
  updateComment,
  deleteComment,
};
