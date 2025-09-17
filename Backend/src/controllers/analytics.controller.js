const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const NGO = require("../models/NGO");

// Get user analytics
const getUserAnalytics = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const donations = await Donation.find({ donor: userId })
      .populate("campaign", "title")
      .populate("ngo", "organizationName");

    const totalDonated = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    const campaignsSupported = new Set(
      donations.map((d) => d.campaign._id.toString())
    ).size;
    const ngosSupported = new Set(donations.map((d) => d.ngo._id.toString()))
      .size;

    res.json({
      success: true,
      analytics: {
        totalDonations: donations.length,
        totalAmountDonated: totalDonated,
        campaignsSupported,
        ngosSupported,
        recentDonations: donations.slice(0, 5), // Last 5 donations
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get NGO analytics
const getNGOAnalytics = async (req, res, next) => {
  try {
    const ngoId = req.params.ngoId;

    const campaigns = await Campaign.find({ ngo: ngoId });
    const campaignIds = campaigns.map((c) => c._id);

    const donations = await Donation.find({
      campaign: { $in: campaignIds },
    }).populate("donor", "name");

    const totalRaised = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    const uniqueDonors = new Set(donations.map((d) => d.donor._id.toString()))
      .size;

    const campaignAnalytics = campaigns.map((campaign) => ({
      campaignId: campaign._id,
      title: campaign.title,
      target: campaign.targetAmount,
      raised: campaign.raisedAmount,
      progress: (campaign.raisedAmount / campaign.targetAmount) * 100,
    }));

    res.json({
      success: true,
      analytics: {
        totalCampaigns: campaigns.length,
        activeCampaigns: campaigns.filter((c) => !c.isCompleted).length,
        totalRaised,
        totalDonations: donations.length,
        uniqueDonors,
        campaignAnalytics,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserAnalytics,
  getNGOAnalytics,
};
