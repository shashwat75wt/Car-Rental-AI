export interface Car {
  id: number;
  name: string;
  image: string;
  pricePerDay: number;
  availability: boolean;
  location: { lat: number; lng: number };
  category: string; // Sedan, SUV, Sports, etc.
  fuelType: string; // Petrol, Diesel, Electric, Hybrid
  transmission: string; // Automatic, Manual
  seats: number; // Number of seats
  predictedPrice?: number;
}



export const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Corolla",
    image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 50,
    availability: true,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Sedan",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    predictedPrice: 10
  },
  {
    id: 2,
    name: "Honda Civic",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 55,
    availability: false,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Sedan",
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 5,
  },
  {
    id: 3,
    name: "Tesla Model 3",
    image: "https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 120,
    availability: true,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 5,
  },
  {
    id: 4,
    name: "Ford Mustang",
    image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 150,
    availability: true,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Sports",
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 4,
  },
  {
    id: 5,
    name: "Chevrolet Camaro",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 140,
    availability: true,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Sports",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 4,
  },
  {
    id: 6,
    name: "BMW M3",
    image: "https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 200,
    availability: false,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Luxury",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
  },
  {
    id: 7,
    name: "Mercedes-Benz C-Class",
    image: "https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 180,
    availability: true,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Luxury",
    fuelType: "Diesel",
    transmission: "Automatic",
    seats: 5,
  },
  {
    id: 8,
    name: "Audi A4",
    image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 170,
    availability: true,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Luxury",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
  },
  {
    id: 9,
    name: "Lamborghini Huracan",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 500,
    availability: false,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Sports",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 2,
  },
  {
    id: 10,
    name: "Porsche 911",
    image: "https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg?w=400&h=300&fit=crop",
    pricePerDay: 450,
    availability: true,
    location: { lat: 40.7128, lng: -74.006 },
    category: "Sports",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 2,
  },
];
