const express = require("express");
const { predictPricesController, getAllPredictionsController } = require("../controllers/predictPriceController");

const router = express.Router();

router.post("/predict", predictPricesController);
router.get("/predictions", getAllPredictionsController ); 

module.exports = router;
