import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  TextField,
  Typography,
  Divider
} from "@mui/material";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
  const car = storedCars.find((c: any) => c.id === Number(id));

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [review, setReview] = useState("");
  const [response, setResponse] = useState("");
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);

  if (!car) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{ background: "linear-gradient(135deg, #3a1c71, #640D5F)" }}
      >
        <Typography variant="h4" color="error">
          Car not found! 🚗❌
        </Typography>
      </Box>
    );
  }

  const handleBooking = () => {
    if (startDate && endDate) {
      const days = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const totalPrice = days * car.pricePerDay;

      navigate("/payment", {
        state: { carId: car.id, carName: car.name, startDate, endDate, totalPrice },
      });
    }
  };

  const handleReviewSubmit = async () => {
    if (!review.trim()) return alert("Please enter a review!");

    try {
      const res = await fetch("http://localhost:8000/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });

      const data = await res.json();
      setResponse(data.response);

      if (data?.sentiment?.toLowerCase() === "positive") {
        setPositiveCount((prev) => prev + 1);
      } else if (data?.sentiment?.toLowerCase() === "negative") {
        setNegativeCount((prev) => prev + 1);
      }

      setReview("");
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error submitting review");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ background: "linear-gradient(135deg, #3a1c71, #640D5F)", padding: 4 }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            position: "relative",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
            borderRadius: 3,
            color: "#fff",
            boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
            paddingBottom: 2,
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={car.image}
            alt={car.name}
            sx={{ filter: car.availability ? "none" : "blur(6px)" }}
          />

          {!car.availability && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                🚫 Not Available
              </Typography>
            </Box>
          )}

          <CardContent>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {car.name}
            </Typography>
            <Typography variant="h6">
              Price per day:{" "}
              <strong style={{ color: "#FFD700", fontSize: "1.2rem" }}>
                ${car.pricePerDay}
              </strong>
            </Typography>

            {car.availability ? (
              <Box mt={3}>
                <Typography variant="h6">Book this Car:</Typography>
                <TextField
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ my: 2, background: "rgba(255, 255, 255, 0.2)", borderRadius: 1 }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: 2, background: "rgba(255, 255, 255, 0.2)", borderRadius: 1 }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "linear-gradient(135deg, #ff8c00, #ff4500)",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": { background: "linear-gradient(135deg, #ff4500, #ff8c00)" },
                  }}
                  onClick={handleBooking}
                >
                  Proceed to Payment
                </Button>
              </Box>
            ) : (
              <Typography variant="h5" fontWeight="bold" color="error">
                This car is currently not available! 🚗❌
              </Typography>
            )}


<Divider />

            <Box mt={4} textAlign="center">
              <Typography variant="h5" fontWeight="bold">Leave a Review</Typography>
              <TextField
  multiline
  rows={3}
  fullWidth
  placeholder="Write your review here..."
  value={review}
  onChange={(e) => setReview(e.target.value)}
  sx={{
    mt: 2,
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: 1,
    "& .MuiInputBase-input, & .MuiInputBase-input::placeholder": {
      color: "white",
    },
  }}
/>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, background: "linear-gradient(135deg, #ff8c00, #ff4500)", fontWeight: "bold" }}
                onClick={handleReviewSubmit}
              >
                Submit Review
              </Button>
              <Typography variant="h6" mt={2}>AI Response: {response}</Typography>
              <Typography variant="body1">👍 Positive: {positiveCount}</Typography>
              <Typography variant="body1">👎 Negative: {negativeCount}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CarDetails;
