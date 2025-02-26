const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  purchasePrice: Number,
  day: String,
  predictedPrice: Number,
});

const PricingModel = mongoose.model("Pricing", PricingSchema);

module.exports = PricingModel;
