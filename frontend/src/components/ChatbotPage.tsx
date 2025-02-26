import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Full-Screen Chatbot Page Component
const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send message to backend
  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botResponse = { text: data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error connecting to chatbot.", sender: "bot" }]);
    }

    setInput(""); // Clear input after sending
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #3a1c71, #640D5F)",
          position: "relative",
        }}
      >
        {/* Back Button */}
        {/* <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "#FFD700",
            color: "#640D5F",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#FFC300" },
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button> */}

        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            scrollbarWidth: "thin",
            scrollbarColor: "#640D5F #ffffff",
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: "75%", // Ensures messages do not stretch too much
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#FFD700" : "#f0f0f0",
                color: msg.sender === "user" ? "#640D5F" : "#333",
                padding: "10px 14px",
                borderRadius: msg.sender === "user" ? "15px 15px 0 15px" : "15px 15px 15px 0",
                boxShadow: 2,
                fontSize: "14px",
                lineHeight: "1.5",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {msg.text}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Box (Fixed at Bottom) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderTop: "1px solid #ddd",
            backgroundColor: "#fff",
            position: "sticky",
            bottom: 0,
            width: "98%",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              flex: 1,
              "& fieldset": { border: "none" },
            }}
            inputProps={{
              style: {
                fontSize: "14px", // Prevents text from being too big
                padding: "10px",
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            sx={{
              ml: 1.5,
              backgroundColor: "gold",
              color: "#640D5F",
              fontWeight: "bold",
              minWidth: "44px",
              height: "44px",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "#FFD700" },
            }}
          >
            <Send size={20} />
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ChatbotPage;
