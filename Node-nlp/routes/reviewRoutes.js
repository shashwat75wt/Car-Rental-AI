const express = require("express");
const { analyzeReview } = require("../controllers/reviewController");

const router = express.Router();

// API Route for Car Reviews
router.post("/review", analyzeReview);

module.exports = router;