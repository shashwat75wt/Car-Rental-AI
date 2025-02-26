import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Autocomplete,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";
import { cars } from "../data/cars"; // Import car data

export default function Authenticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutUser] = useLogoutMutation();

  // 🔹 Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Logout handler
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  // Prevent rendering if not authenticated (avoid flicker)
  if (!isAuthenticated) return null;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route?: "profile") => () => {
    if (route) navigate("/" + route);
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);
    setFilteredCars(query ? cars.filter((car) => car.name.toLowerCase().includes(query)) : []);
  };

  const handleSearchSelect = (event: any, value: any) => {
    if (value) {
      navigate(`/cars/${value.id}`);
      setSearchText("");
      setFilteredCars([]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Animated Navbar */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <AppBar
          position="static"
          
          sx={{
            background: "linear-gradient(90deg, #1A1A2E, #16213E)", // Premium theme
            boxShadow: 3,
            
          }}
        >
          <Toolbar>
            {/* Sidebar Toggle */}
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Logo / Branding */}
            <Box display="flex" gap={2} alignItems="center" component={Link} to="/cars" sx={{ textDecoration: "none", flexGrow: 1 }}>
              <Typography variant="h6" sx={{ color: "#F8F9FA", fontWeight: "bold", "&:hover": { opacity: 0.8 } }}>
                Car Rental
              </Typography>
            </Box>

            {/* ✅ Show Search Bar Only on /cars Route */}
            {location.pathname === "/cars" && (
              <Autocomplete
                freeSolo
                options={filteredCars}
                getOptionLabel={(option) => option.name}
                onChange={handleSearchSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    placeholder="Search cars..."
                    value={searchText}
                    onChange={handleSearchInputChange}
                    sx={{ backgroundColor: "#ECECEC", borderRadius: "8px", width: 250 }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#555" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}

            {/* My Bookings Button */}
            <Button color="inherit" component={Link} to="/booking-history" sx={{ ml: 2 }}>
              My Bookings
            </Button>

            {/* Profile & Logout */}
            {isAuthenticated && (
              <Box marginLeft="auto">
                <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                  <PersonIcon />
                </IconButton>

                {/* Dropdown Menu */}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose()}
                  sx={{ "& .MuiPaper-root": { overflow: "hidden" } }}
                >
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                    <MenuItem onClick={handleClose("profile")}>
                      <PersonIcon sx={{ mr: 1 }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1, color: "red" }} />
                      Logout
                    </MenuItem>
                  </motion.div>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "red" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Outlet />
    </Box>
  );
}
