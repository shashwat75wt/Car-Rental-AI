import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  const handleDelete = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #3a1c71, #640D5F)",
        color: "#fff",
        textAlign: "center",
        py: 5,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 4,
          color: "#FFD700",
          textShadow: "0px 3px 12px rgba(255, 215, 0, 0.8)",
        }}
      >
        Booking History 📜
      </Typography>

      {bookings.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#fff" }}>
          No bookings found! 🚗❌
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ width: "90%", maxWidth: "1200px" }}
        >
          {bookings.map((booking, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    backdropFilter: "blur(15px)",
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                    color: "#fff",
                    textAlign: "left",
                    p: 2,
                    position: "relative",
                  }}
                >
                  <IconButton
                    onClick={() => handleDelete(index)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                      backgroundColor: "rgba(255, 0, 0, 0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#FFD700",
                        textShadow: "0px 2px 6px rgba(255, 215, 0, 0.8)",
                        mb: 1,
                      }}
                    >
                      {booking.carName}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      <strong>From:</strong> {booking.startDate}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      <strong>To:</strong> {booking.endDate}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#FFD700", fontWeight: "bold" }}
                    >
                      Total Paid: ${booking.totalPrice}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BookingHistory;
