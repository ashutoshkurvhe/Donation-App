const express = require("express");
const donationController = require("../controllers/donation.controller");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, donationController.makeDonation);
router.get("/", authenticate, donationController.getUserDonations);
router.delete("/:id", authenticate, donationController.deleteDonation);

module.exports = router;
