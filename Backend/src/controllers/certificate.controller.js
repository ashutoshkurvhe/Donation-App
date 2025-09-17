const Certificate = require("../models/Certificate");
const Donation = require("../models/Donation");
const User = require("../models/User");
const NGO = require("../models/NGO");
const Campaign = require("../models/Campaign");

// 🎖 Generate Certificate (after donation success)
const generateCertificate = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.donationId)
      .populate("user")
      .populate("ngo")
      .populate("campaign");

    if (!donation)
      return res.status(404).json({ message: "Donation not found" });
    if (donation.paymentStatus !== "completed") {
      return res.status(400).json({ message: "Donation not completed yet" });
    }

    const donorName = donation.user.name;
    const ngoName = donation.ngo.organizationName;
    const campaignTitle = donation.campaign.title;

    const textTemplate = `We hereby certify that ${donorName} has generously contributed 
towards the "${campaignTitle}" campaign organized by ${ngoName}. 
This act of kindness is deeply appreciated and acknowledged.`;

    const certificate = new Certificate({
      donation: donation._id,
      donor: donation.user._id,
      ngo: donation.ngo._id,
      campaign: donation.campaign._id,
      donorName,
      ngoName,
      campaignTitle,
      certificateText: textTemplate,
    });

    await certificate.save();
    res
      .status(201)
      .json({ message: "Certificate generated successfully", certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📜 Get Certificates by User
const getCertificatesByUser = async (req, res) => {
  try {
    const certificates = await Certificate.find({ donor: req.params.userId });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📜 Get Certificates by NGO
const getCertificatesByNGO = async (req, res) => {
  try {
    const certificates = await Certificate.find({ ngo: req.params.ngoId });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Certificate (if admin/ngo wants)
const deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert)
      return res.status(404).json({ message: "Certificate not found" });
    res.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateCertificate,
  getCertificatesByUser,
  getCertificatesByNGO,
  deleteCertificate,
};
