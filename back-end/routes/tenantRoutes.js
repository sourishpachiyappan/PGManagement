const express = require("express");
const {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
} = require("../controllers/tenantController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All tenant routes now require authentication
router.post("/", authMiddleware, createTenant);
router.get("/", authMiddleware, getTenants);
router.get("/:id", authMiddleware, getTenantById);
router.put("/:id", authMiddleware, updateTenant);
router.delete("/:id", authMiddleware, deleteTenant);

module.exports = router;
