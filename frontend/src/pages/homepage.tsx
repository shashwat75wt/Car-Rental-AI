import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatbotButton from "../components/ChatbotButton";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, DirectionsCar, AttachMoney, SupportAgent } from "@mui/icons-material";

// Dummy data for user visits
const visitData = [
  { period: "Daily", visits: 120 },
  { period: "Weekly", visits: 850 },
  { period: "Yearly", visits: 15000 },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3a1c71, #3a1c71, #640D5F)",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: "2px 2px 10px rgba(255,255,255,0.3)" }}>
          Drive Your Dreams 🚗✨
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ opacity: 0.9 }}>
          Hassle-free Car Rentals, Anytime & Anywhere!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            background: "gold",
            color: "#640D5F",
            fontWeight: "bold",
            fontSize: "18px",
            borderRadius: "8px",
            px: 4,
            py: 1,
            transition: "0.3s",
            "&:hover": { background: "#FFD700", transform: "scale(1.05)" },
          }}
          onClick={() => navigate("/cars")}
        >
          Rent a Car 🚘
        </Button>
      </Container>

      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Why Choose Us? 🏆
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { title: "Wide Selection", desc: "Choose from a variety of cars to suit your needs.", icon: <DirectionsCar fontSize="large" /> },
            { title: "Affordable Pricing", desc: "Best rates with transparent pricing.", icon: <AttachMoney fontSize="large" /> },
            { title: "Easy Booking", desc: "Quick and seamless rental process.", icon: <TrendingUp fontSize="large" /> },
            { title: "24/7 Support", desc: "We're always here to assist you.", icon: <SupportAgent fontSize="large" /> },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  borderRadius: "15px",
                  textAlign: "center",
                  p: 3,
                  boxShadow: 4,
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* User Visit Statistics - Premium Chart */}
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
          background: "rgba(255, 255, 255, 0.15)",
          p: 4,
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          boxShadow: "0 5px 15px rgba(255, 255, 255, 0.3)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          User Visit Trends 📊
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={visitData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="gold" stopOpacity={0.8} />
                <stop offset="95%" stopColor="gold" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            <XAxis dataKey="period" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ background: "#640D5F", color: "#fff", borderRadius: "10px" }}
              cursor={{ stroke: "gold", strokeWidth: 2 }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="gold"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorVisits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Container>

      {/* Floating Chatbot Button */}
      <ChatbotButton />
    </Box>
  );
};

export default Home;
