const { NlpManager } = require("node-nlp");
const fs = require("fs");
const path = require("path");
const PricingModel = require("../dbModel/pricingModel");

// Initialize NLP Manager
const manager = new NlpManager({ languages: ["en"] });

// Paths for model and training data
const modelPath = path.join(__dirname, "../models/pricingModel.nlp");
const dataPath = path.join(__dirname, "../data/pricingData.json");

// Ensure `models` directory exists
const modelsDir = path.join(__dirname, "../models");
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir);

// Load training data
const trainingData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Function to train the model
const trainPricingModel = async () => {
  console.log("Training Pricing Model...");

  trainingData.forEach(({ purchasePrice, day, rentalPrice }) => {
    const input = `Price: ${purchasePrice} on ${day}`;
    manager.addDocument("en", input, `price.${day}`);
    manager.addAnswer("en", `price.${day}`, rentalPrice.toString());
  });

  await manager.train();
  manager.save(modelPath);
  console.log("✅ Pricing Model Trained & Saved:", modelPath);
};

// Load existing model or train a new one
const loadModel = async () => {
  if (fs.existsSync(modelPath)) {
    console.log("📥 Loading Existing Pricing Model...");
    await manager.load(modelPath);
  } else {
    await trainPricingModel();
  }
};

// Function to predict prices for the next 7 days
const predictPrices = async (purchasePrice) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const predictions = {};

  for (const day of days) {
    // Check MongoDB cache first
    let existingPrediction = await PricingModel.findOne({ purchasePrice, day });

    if (existingPrediction) {
      console.log(`📦 Cached Prediction for ${day}: $${existingPrediction.predictedPrice}`);
      predictions[day] = `$${existingPrediction.predictedPrice.toFixed(2)}`;
    } else {
      // Generate new prediction
      const input = `Price: ${purchasePrice} on ${day}`;
      const response = await manager.process("en", input);
      let predictedPrice = response.answer ? parseFloat(response.answer) : purchasePrice * 0.003;

      // Apply Edge Case Handling
      if (predictedPrice < 20) predictedPrice = 20;  // Minimum rental price
      if (predictedPrice > 150) predictedPrice = 150; // Maximum rental price

      predictions[day] = `$${predictedPrice.toFixed(2)}`;

      // Save new prediction in MongoDB
      await PricingModel.create({ purchasePrice, day, predictedPrice });
      console.log(`💾 Saved Prediction for ${day}: $${predictedPrice.toFixed(2)}`);
    }
  }

  return predictions;
};

// Function to fetch all predictions from MongoDB
const getAllPredictions = async () => {
  return await PricingModel.find();
};

// Load the model at startup
loadModel();

module.exports = { predictPrices, getAllPredictions };
