const { predictPrices, getAllPredictions } = require("../services/pricingService");

const predictPricesController = async (req, res) => {
  try {
    const { purchasePrice } = req.body;

    if (!purchasePrice) {
      return res.status(400).json({ error: "Purchase price is required" });
    }

    const predictions = await predictPrices(purchasePrice);
    res.json({ predictions });
  } catch (error) {
    console.error("Error predicting prices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPredictionsController = async (req, res) => {
  try {
    const predictions = await getAllPredictions();
    res.json(predictions);
  } catch (error) {
    console.error("Error fetching predictions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { predictPricesController, getAllPredictionsController };
