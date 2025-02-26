const { NlpManager } = require("node-nlp");
const natural = require("natural");
const fs = require("fs");

// Initialize NLP Manager
const manager = new NlpManager({ languages: ["en"], forceNER: true });

// Load training data
const trainingData = require("../data/carReviews.json");

// Spell correction using natural.js
const dictionary = trainingData.flatMap((entry) => entry.examples);
const spellcheck = new natural.Spellcheck(dictionary);

// Function to correct spelling safely
const correctSpelling = (text) => {
  const words = text.split(" ");
  return words
    .map((word) => {
      const suggestions = spellcheck.getCorrections(word, 1);
      return suggestions.length > 0 ? suggestions[0] : word;
    })
    .join(" ");
};

// Function to preprocess text
const preprocessText = (text) => {
  text = text.toLowerCase();
  text = correctSpelling(text);
  return text;
};

// Ensure the `models` directory exists
const modelPath = "./models/reviewModel.nlp";
if (!fs.existsSync("./models")) fs.mkdirSync("./models");

// Train NLP model
const trainModel = async () => {
  console.log("Training model...");

  trainingData.forEach((item) => {
    item.examples.forEach((example) =>
      manager.addDocument("en", example, item.intent)
    );
    item.responses.forEach((response) =>
      manager.addAnswer("en", item.intent, response)
    );
  });

  await manager.train();
  await manager.save();
  console.log("Training complete! Model saved.");
};

// Load or train model
const loadModel = async () => {
  if (fs.existsSync(modelPath)) {
    console.log("Loading existing model...");
    await manager.load(); // No path needed
  } else {
    await trainModel();
  }
};

// Process review for sentiment analysis
const processReview = async (review) => {
  review = preprocessText(review);
  const response = await manager.process("en", review);

  let sentimentLabel = "Neutral"; // Default
  if (response.intent === "negative_review") {
    sentimentLabel = "Negative";
  } else if (response.intent === "positive_review") {
    sentimentLabel = "Positive";
  }

  return {
    sentiment: sentimentLabel,
    response: `This review is classified as ${sentimentLabel}`,
    score: response.score,
  };
};

// Load model on startup
loadModel();

module.exports = { processReview };
