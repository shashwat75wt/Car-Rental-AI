const express = require("express");
const bodyParser = require("body-parser");
const chatbotRoutes = require("./routes/chatbotRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

//Connect to MongoDB
connectDB();

// Routes
app.use("/api", chatbotRoutes);
app.use("/api", reviewRoutes);
app.use("/pricing", pricingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
