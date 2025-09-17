const express = require("express");
const {
  generateCertificate,
  getCertificatesByUser,
  getCertificatesByNGO,
  deleteCertificate,
} = require("../controllers/certificate.controller");
const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:donationId", authenticate, generateCertificate);

router.get("/user/:userId", authenticate, getCertificatesByUser);

router.get(
  "/ngo/:ngoId",
  authenticate,
  authorizeRoles("ngo", "super-admin"),
  getCertificatesByNGO
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ngo", "super-admin"),
  deleteCertificate
);

module.exports = router;
