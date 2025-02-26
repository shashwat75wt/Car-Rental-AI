import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state;

  useEffect(() => {
    if (bookingDetails) {
      const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      storedBookings.push(bookingDetails);
      localStorage.setItem("bookings", JSON.stringify(storedBookings));
    }
  }, [bookingDetails]);

  if (!bookingDetails) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" color="error">
          No Booking Found! 🚗❌
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #3a1c71, #640D5F)",
        color: "#fff",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            maxWidth: 420,
            p: 4,
            borderRadius: 6,
            backdropFilter: "blur(15px)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "#FFD700",
                textShadow: "0px 2px 8px rgba(255, 215, 0, 0.8)",
                marginBottom: "1rem",
              }}
            >
              Booking Confirmed! 🎉
            </Typography>

            <Typography variant="body1" sx={{ color: "#fff", marginBottom: "0.5rem" }}>
              <strong>Car:</strong> {bookingDetails.carName}
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff", marginBottom: "0.5rem" }}>
              <strong>From:</strong> {bookingDetails.startDate}
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff", marginBottom: "0.5rem" }}>
              <strong>To:</strong> {bookingDetails.endDate}
            </Typography>
            <Typography variant="body1" sx={{ color: "#FFD700", fontWeight: "bold", marginBottom: "1.5rem" }}>
              Total Paid: ${bookingDetails.totalPrice}
            </Typography>

            {/* Button with Softer Glow */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #FFD700, #FFAA00)",
                  color: "#3a1c71",
                  borderRadius: 2,
                  boxShadow: "0px 6px 15px rgba(255, 215, 0, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #FFAA00, #FFD700)",
                  },
                }}
                onClick={() => navigate("/")}
              >
                GO TO HOME 🏠
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Confirmation;
