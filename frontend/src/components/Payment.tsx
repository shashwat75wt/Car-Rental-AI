import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state;

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  if (!bookingDetails) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" color="error">
          No Booking Details Found! 🚗❌
        </Typography>
      </Box>
    );
  }

  const handlePayment = () => {
    // Simulating payment success
    const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");

    const updatedCars = storedCars.map((car: any) =>
      car.id === bookingDetails.carId ? { ...car, availability: false } : car
    );

    localStorage.setItem("cars", JSON.stringify(updatedCars));

    setTimeout(() => {
      navigate("/confirmation", { state: bookingDetails });
    }, 2000);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #3a1c71, #640D5F)",
        color: "#fff",
        
      }}
    >
      {/* Animated Payment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            
            maxWidth: 420,
            p: 3,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            height: 500
          }}
        >
          <DotLottieReact
            src="https://lottie.host/4ed9858f-1fca-42dd-9880-1b0007e3159e/47Bydb7EPX.lottie"
            loop
            autoplay
            style={{ height: 120 }}
          />
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "#FFD700",
                textShadow: "0px 2px 10px rgba(255, 215, 0, 0.8)",
              }}
            >
              Secure Payment
            </Typography>
            <Typography variant="body1" mt={2}>
              Pay <strong style={{ color: "#FFD700" }}>${bookingDetails.totalPrice}</strong> for your booking.
            </Typography>

            {/* Payment Form */}
            <Box mt={3}>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                type="number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                sx={{
                  mb: 2,
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                  input: { color: "#fff" },
                  label: { color: "#ccc" },
                }}
              />
              <TextField
                label="Expiry Date (MM/YY)"
                variant="outlined"
                fullWidth
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                sx={{
                  mb: 2,
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                  input: { color: "#fff" },
                  label: { color: "#ccc" },
                }}
              />
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                type="number"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                sx={{
                  mb: 2,
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                  input: { color: "#fff" },
                  label: { color: "#ccc" },
                }}
              />
            </Box>

            {/* Pay Now Button */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #FFD700, #FFAA00)",
                  color: "#3a1c71",
                  borderRadius: 2,
                  boxShadow: "0px 4px 15px rgba(255, 215, 0, 0.5)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #FFAA00, #FFD700)",
                  },
                }}
                onClick={handlePayment}
              >
                Pay Now 💳
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Payment;
