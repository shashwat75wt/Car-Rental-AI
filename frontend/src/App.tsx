import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AuthenticatedLayout from "./layouts/Authanticated";
import BasicLayout from "./layouts/Basic";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import CarDetails from "./components/CarDetails";
import Payment from "./pages/paymentPage";
import Confirmation from "./pages/confirmationPage";
import BookingHistory from "./pages/bookingHistoryPage";
import { cars } from "./data/cars";
import CarList from "./pages/CarsListPage";
import Chatbot from "./components/ChatbotButton";
import ChatbotPage from "./components/ChatbotPage";

function App() {
  useEffect(() => {
    const storedCars = localStorage.getItem("cars");

    // Only store cars if they are not already in localStorage
    if (!storedCars || JSON.parse(storedCars).length === 0) {
      localStorage.setItem("cars", JSON.stringify(cars));
      console.log("Cars saved to localStorage!");
    }
  }, []);

  return (
    <Routes>
      {/* Authenticated Layout (Users must be logged in) */}
      <Route
        element={
          <>
            <AuthenticatedLayout />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/chat" element={<ChatbotPage />} />
      </Route>

      {/* Basic Layout (For login & register) */}
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
