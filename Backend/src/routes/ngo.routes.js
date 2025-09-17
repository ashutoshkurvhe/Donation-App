const express = require("express");
const {
  createNGO,
  getNGOs,
  getNGOById,
  updateNGO,
  deleteNGO,
} = require("../controllers/ngo.controller");
const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, authorizeRoles("ngo", "super-admin"), createNGO);
router.get("/", getNGOs);
router.get("/:id", getNGOById);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("ngo", "super-admin"),
  updateNGO
);
router.delete("/:id", authenticate, authorizeRoles("super-admin"), deleteNGO);

module.exports = router;
