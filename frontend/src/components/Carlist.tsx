import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Slider, Card, CardActions, CardContent, CardMedia, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios"; 

interface Car {
  id: string;
  name: string;
  category: string;
//   fuelType: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  image: string;
  availability: boolean;
  predictedPrices?: number[];
}

const CarList: React.FC = () => {
  const [carList, setCarList] = useState<Car[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]); // ✅ Default Range: $0 - $1000

  useEffect(() => {
    const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") || "[]");
    let storedPredictions: Car[] = JSON.parse(localStorage.getItem("carsWithPredictions") || "[]");
  
    if (storedCars.length === 0) {
      console.warn("⚠️ No cars found in localStorage!");
      return;
    }
  
    const updatedCars = storedCars.map((car, index) => {
      let basePrices;
  
      if (storedPredictions.length > 0 && storedPredictions[index]?.predictedPrices) {
        // ✅ Apply a **random variation** (could be small or large)
        basePrices = storedPredictions[index].predictedPrices.map((prevPrice) => {
          const variation = Math.random() * 0.2 - 0.1; // (-10% to +10%) but random size
          return Math.max(prevPrice * (1 + variation), 10);
        });
      } else {
        // ✅ First-time predictions (random variation between -10% and +30%)
        basePrices = Array.from({ length: 7 }, () => {
          const variation = Math.random() * 0.4 - 0.1; // (-10% to +30%) but random each time
          return Math.max(car.pricePerDay * (1 + variation), 10);
        });
      }
  
      return { ...car, predictedPrices: basePrices };
    });
  
    localStorage.setItem("carsWithPredictions", JSON.stringify(updatedCars));
    setCarList(updatedCars);
  }, []);
  
  

  useEffect(() => {
    const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") || "[]");

    console.log("🚀 Loaded Cars from LocalStorage:", storedCars); // Debugging

    if (storedCars.length === 0) {
      console.warn("⚠️ No cars found in localStorage!");
      return;
    }

    const fetchPredictions = async () => {
      try {
        const updatedCars = await Promise.all(
          storedCars.map(async (car) => {
            try {
              console.log("📤 Sending to API:", { purchasePrice: car.pricePerDay });

              const response = await axios.post("http://localhost:8000/pricing/predict", {
                purchasePrice: car.pricePerDay,
              });

              console.log(`📥 Response for ${car.id} ${car.name}:`, response.data.predictions);

              return { ...car, predictedPrice: response.data.predictions ?? "N/A" };
            } catch (apiError) {
              console.error("❌ API Error for car:", car.id, apiError);
              return { ...car, predictedPrice: "N/A" }; // Fallback
            }
          })
        );

        // ✅ Store updated car list in localStorage
        localStorage.setItem("carsWithPredictions", JSON.stringify(updatedCars));

        // ✅ Update state
        setCarList(updatedCars);
      } catch (error) {
        console.error("❌ Error fetching AI predictions:", error);
      }
    };

    // ✅ First, check if localStorage already has predictions
    const storedPredictions = JSON.parse(localStorage.getItem("carsWithPredictions") || "[]");

    if (storedPredictions.length > 0) {
      console.log("✅ Using Cached Predictions from LocalStorage");
      setCarList(storedPredictions);
    } else {
      fetchPredictions(); // Fetch from API if no cached data
    }
  }, []);

  // ✅ Filter Cars by Selected Price Range
  const filteredCars = carList.filter(
    (car) => car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3a1c71,#640D5F, #640D5F)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
      }}
    >
      <Container>
        {/* 🏷️ Price Range Filter */}
        <Box sx={{ mb: 4, textAlign: "center", color: "#fff" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            Filter by Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={50}
            sx={{ width: "60%", color: "#FFD700" }} // Gold Color
          />
          <Typography variant="body1" sx={{ mt: 1 }}>
            ${priceRange[0]} - ${priceRange[1]} per day
          </Typography>
        </Box>

        {/* 🚗 Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={{
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            mb: 4,
          }}
        >
          Explore Our Premium Cars
        </Typography>

        {/* 🚘 Filtered Cars Grid */}
        <Grid container spacing={3} justifyContent="center">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
                {/* ✅ Inlined CarCard Component */}
                <Card
                  sx={{
                    maxWidth: 320,
                    mx: "auto",
                    borderRadius: 3,
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
                    },
                  }}
                >
                  <CardMedia component="img" height="200" image={car.image} alt={car.name} />

                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>
                      {car.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ddd", mb: 0.5 }}>
                      <strong>Category:</strong> {car.category}
                    </Typography>
                    {/* <Typography variant="body2" sx={{ color: "#ddd", mb: 0.5 }}>
                      <strong>Fuel Type:</strong> {car.fuelType}
                    </Typography> */}
                    <Typography variant="body2" sx={{ color: "#ddd", mb: 0.5 }}>
                      <strong>Transmission:</strong> {car.transmission}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ddd", mb: 1 }}>
                      <strong>Seats:</strong> {car.seats}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ddd", mb: 1 }}>
                      <strong>Price per day:</strong>{" "}
                      <span style={{ fontWeight: "bold", color: "#FFD700" }}>${car.pricePerDay}</span>
                    </Typography>

                    {/* ✅ Show Predicted Price */}
                    <Accordion
  sx={{
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    boxShadow: "none",
    mt: 1,
  }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#FFD700" }} />}>
    <Typography variant="body2" sx={{ color: "#FFD700", fontWeight: "bold" }}>
      Predicted Prices
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    {car.predictedPrices ? (
      car.predictedPrices.map((price, index) => {
        const percentageChange = ((price - car.pricePerDay) / car.pricePerDay) * 100;
        const priceColor = percentageChange >= 0 ? "#f00" : "#0f0"; // Red for increase, Green for decrease
        const arrow = percentageChange >= 0 ? "🔼" : "🔽";

        return (
          <Typography key={index} variant="body2" sx={{ color: "#FFD700" }}>
            📅 Day {index + 1}: <strong>${price.toFixed(2)}</strong>{" "}
            <span style={{ color: priceColor }}>
              {arrow} {Math.abs(percentageChange).toFixed(2)}%
            </span>
          </Typography>
        );
      })
    ) : (
      <Typography variant="body2" sx={{ color: "#f00" }}>Not Available</Typography>
    )}
  </AccordionDetails>
</Accordion>



                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: car.availability ? "#0f0" : "#f00",
                      }}
                    >
                      {car.availability ? "Car is currently available" : "Car is currently not available"}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(135deg, #ff8c00, #ff4500)",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": {
                          background: "linear-gradient(135deg, #ff4500, #ff8c00)",
                        },
                      }}
                      component={Link}
                      to={`/cars/${car.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ color: "#fff", mt: 3 }}>
              No cars found in this price range! 😞
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default CarList;
