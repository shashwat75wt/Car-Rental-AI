import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Fab, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat"; // Chatbot Icon
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"; // FAQs Icon
import CloseIcon from "@mui/icons-material/Close"; // Close Chat Icon

const ChatbotButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Handle Menu Open
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle Menu Close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Navigate to a specific route and close the menu
  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  useEffect(() => {
    setAnimate(true);

    // Stop animation after 5 seconds
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        marginRight: "50px",
        marginBottom: "10px",
      }}
    >
      {/* Floating Action Button for Chatbot */}
      <Fab
        color="secondary"
        aria-label="chatbot"
        onClick={handleClick}
        sx={{
          animation: animate ? "oscillate 1s ease-in-out" : "none",
          background: "#FFD700",
          color: "#640D5F",
          "&:hover": { background: "#FFC107" },
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chatbot Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleNavigate("/chat")}>
          <ListItemIcon>
            <QuestionAnswerIcon fontSize="small" sx={{ color: "#3379C7" }} />
          </ListItemIcon>
          <ListItemText>Start Chat</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CloseIcon fontSize="small" sx={{ color: "#3379C7" }} />
          </ListItemIcon>
          <ListItemText>Close Chat</ListItemText>
        </MenuItem>
      </Menu>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes oscillate {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(10deg); }
            50% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ChatbotButton;
