const express = require("express");
const { getAllPGs, addPG, updatePG, deletePG } = require("../controllers/pgController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all PGs
router.get("/", authMiddleware, getAllPGs);
router.post('/add/pgs', authMiddleware, addPG)
router.put('/update/pg/:id', authMiddleware, updatePG);
router.delete('/delete/pg/:id', authMiddleware, deletePG);

module.exports = router;
