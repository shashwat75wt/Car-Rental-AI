const { processChatbotMessage } = require("../services/chatBotService");

// Handle chatbot message request
const processMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const response = await processChatbotMessage(message);
    res.json({ response });
  } catch (error) {
    console.error("Error processing chatbot message:", error);
    res.status(500).json({ response: "Something went wrong. Please try again later." });
  }
};

module.exports = { processMessage };
