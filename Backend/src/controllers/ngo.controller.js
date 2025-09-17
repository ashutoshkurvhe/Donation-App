const NGO = require("../models/NGO");

// Create NGO
const createNGO = async (req, res, next) => {
  try {
    const ngo = await NGO.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, ngo });
  } catch (error) {
    next(error);
  }
};

// Get all NGOs
const getNGOs = async (req, res, next) => {
  try {
    const ngos = await NGO.find().populate("user", "name email");
    res.json({ success: true, ngos });
  } catch (error) {
    next(error);
  }
};

// Get NGO by ID
const getNGOById = async (req, res, next) => {
  try {
    const ngo = await NGO.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }
    res.json({ success: true, ngo });
  } catch (error) {
    next(error);
  }
};

// Update NGO (only owner or admin)
const updateNGO = async (req, res, next) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    if (
      ngo.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(ngo, req.body);
    await ngo.save();

    res.json({ success: true, ngo });
  } catch (error) {
    next(error);
  }
};

// Delete NGO (super-admin only)
const deleteNGO = async (req, res, next) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    if (req.user.role !== "super-admin")
      return res.status(403).json({ message: "Not authorized" });

    await ngo.deleteOne();
    res.json({ success: true, message: "NGO deleted" });
  } catch (error) {
    next(error);
  }
};

// Approve NGO (admin only)
const approveNGO = async (req, res, next) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      { approved: true, approvedBy: req.user._id, approvedAt: new Date() },
      { new: true }
    );
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    res.json({ success: true, ngo });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNGO,
  getNGOs,
  getNGOById,
  updateNGO,
  deleteNGO,
  approveNGO,
};
