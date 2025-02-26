const { processReview } = require("../services/reviewService");

const analyzeReview = async (req, res) => {
  try {
    const { review } = req.body;

    if (!review) {
      return res.status(400).json({ error: "Review text is required" });
    }

    const result = await processReview(review);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { analyzeReview };
