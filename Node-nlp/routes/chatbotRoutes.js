const express = require("express");
const router = express.Router();
const { processMessage } = require("../controllers/chatbotController"); // Ensure this path is correct

router.post("/chat", processMessage);

module.exports = router;