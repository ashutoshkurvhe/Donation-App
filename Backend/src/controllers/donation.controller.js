const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const NGO = require("../models/NGO");

// Make donation
const makeDonation = async (req, res, next) => {
  try {
    const { campaignId, amount } = req.body;
    const donor = req.user._id;

    const campaign = await Campaign.findById(campaignId).populate("ngo");
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    const donation = await Donation.create({
      campaign: campaignId,
      donor,
      amount,
      paymentStatus: "completed",
      transactionId: "TXN-" + Date.now(),
    });

    // update campaign
    campaign.raisedAmount += amount;
    await campaign.save();

    // auto generate certificate
    const user = await User.findById(donor);
    const ngo = await NGO.findById(campaign.ngo._id);

    const textTemplate = `We hereby certify that ${user.name} has generously contributed 
towards the "${campaign.title}" campaign organized by ${ngo.organizationName}.
This act of kindness is deeply appreciated.`;

    const certificate = await Certificate.create({
      donation: donation._id,
      donor: user._id,
      ngo: ngo._id,
      campaign: campaign._id,
      donorName: user.name,
      ngoName: ngo.organizationName,
      campaignTitle: campaign.title,
      certificateText: textTemplate,
    });

    res.status(201).json({ success: true, donation, certificate });
  } catch (error) {
    next(error);
  }
};

// Get donations for a user
const getUserDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate("campaign", "title")
      .populate("ngo", "organizationName");
    res.json({ success: true, donations });
  } catch (error) {
    next(error);
  }
};

// Delete donation (admin only)
const deleteDonation = async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "super-admin")
      return res.status(403).json({ message: "Not authorized" });

    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    await donation.deleteOne();
    res.json({ success: true, message: "Donation deleted" });
  } catch (error) {
    next(error);
  }
};

// Export the controller functions
const donationController = {
  makeDonation,
  getUserDonations,
  deleteDonation,
};

module.exports = donationController;
