import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import { Car } from "../data/cars";
import { Link } from "react-router-dom";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
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
      {/* Car Image */}
      <CardMedia component="img" height="200" image={car.image} alt={car.name} />

      <CardContent>
        {/* Car Name */}
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>
          {car.name}
        </Typography>

        {/* Car Details */}
        <Typography variant="body2" sx={{ color: "#ddd", mb: 0.5 }}>
          <strong>Category:</strong> {car.category}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ddd", mb: 0.5 }}>
          <strong>Fuel Type:</strong> {car.fuelType}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ddd", mb: 0.5 }}>
          <strong>Transmission:</strong> {car.transmission}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ddd", mb: 1 }}>
          <strong>Seats:</strong> {car.seats}
        </Typography>

        {/* Price Per Day */}
        <Typography variant="body2" sx={{ color: "#ddd", mb: 1 }}>
          <strong>Price per day:</strong>{" "}
          <span style={{ fontWeight: "bold", color: "#FFD700" }}>${car.pricePerDay}</span>
        </Typography>

        {/* Availability */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: car.availability ? "#0f0" : "#f00",
          }}
        >
          {car.availability ? "Available" : "Not Available"}
        </Typography>
      </CardContent>

      {/* Action Buttons */}
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
  );
};

export default CarCard;