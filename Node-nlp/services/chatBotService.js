const { NlpManager } = require("node-nlp");
const natural = require("natural");
const fs = require("fs");

// Initialize NLP Manager
const manager = new NlpManager({ languages: ["en"], forceNER: true });

// Load training data
const trainingData = require("../data/trainingData.json");

// Spell correction using natural.js
const dictionary = trainingData.flatMap((entry) => entry.examples);
const spellcheck = new natural.Spellcheck(dictionary);

// Function to correct spelling
const correctSpelling = (text) => {
  const words = text.split(" ");
  return words.map((word) => {
    const suggestions = spellcheck.getCorrections(word, 1);
    return suggestions.length > 0 ? suggestions[0] : word;
  }).join(" ");
};

// Function to preprocess text
const preprocessText = (text) => {
  text = text.toLowerCase();
  text = correctSpelling(text);
  return text;
};

// Ensure models directory exists
const modelPath = "./models/chatbotModel.nlp";
const modelsDir = "./models";
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir);
}

// Train chatbot function
const trainChatbot = async () => {
  console.log("Training chatbot...");

  trainingData.forEach((item) => {
    item.examples.forEach((example) => manager.addDocument("en", example, item.intent));
    item.responses.forEach((response) => manager.addAnswer("en", item.intent, response));
  });

  await manager.train();
  manager.save(modelPath);
  console.log("Chatbot training complete! Model saved at:", modelPath);
};

// Load model if exists, otherwise train
if (fs.existsSync(modelPath)) {
  manager.load(modelPath);
} else {
  trainChatbot();
}

// Process user message
const processChatbotMessage = async (message) => {
  message = preprocessText(message);
  const response = await manager.process("en", message);

  if (response.intent === "None" || !response.answer) {
    return "I'm sorry, I didn't understand that. Can you rephrase?";
  }
  
  return response.answer;
};

module.exports = { processChatbotMessage, trainChatbot };
