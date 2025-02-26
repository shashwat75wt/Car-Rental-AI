import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";
import PasswordInput from "./PasswordInput";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Validation Schema
const validation = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormData = yup.InferType<typeof validation>;

export default function SignupForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validation),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful! 🎉");
      navigate("/");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0]?.msg;
      toast.error(validationError ?? error?.data?.message ?? "Something went wrong!");
    }
  };

  return (
    <Box
      component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            height="100vh"
            width="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              background: `linear-gradient(135deg, #3a1c71, #3a1c71, #640D5F)`, // Premium gradient
            }}
          >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 900,
          width: "90%",
          p: 3,
          borderRadius: 4,
          display: "flex",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.1)", // Glass effect
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Lottie Animation Section */}
        <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                  }}
                >
          <DotLottieReact
            src="https://lottie.host/a92d4ad1-6555-4048-bc24-e51f65c50785/qIKb1e6y2I.lottie"
            loop
            autoplay
            style={{ width: "100%", maxWidth: 320, height: 320 }}
          />
        </Box>

        {/* Form Section */}
        <CardContent sx={{ flex: 1, p: 4 }}>
                 <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                   <Box textAlign="center" mb={3}>
                     <Typography
                       variant="h4"
                       fontWeight="bold"
                       color="#fff"
                       sx={{
                         fontSize: "1.8rem",
                         letterSpacing: 0.5,
                         textShadow: "0px 0px 10px rgba(255,255,255,0.5)",
                       }}
                     >
                       Welcome Back! 👋
                     </Typography>
                     <Typography variant="body1" color="rgba(255,255,255,0.8)">
                       Sign in to continue
                     </Typography>
                   </Box>

            <TextField
              sx={{
                mt: 2,
                background: "rgba(255, 255, 255, 0.2)", // Semi-transparent input
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255, 255, 255, 0.2)", // Ensures input stays semi-transparent
                  color: "#fff", // White text inside input
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)", // Softer border
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                    boxShadow: "0px 0px 8px #fff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)", // Light label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff", // White when focused
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
              fullWidth
              label="Name"
              placeholder="Enter your full name"
              {...register("name")}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
            <TextField
                         sx={{
                           mt: 2,
                           background: "rgba(255, 255, 255, 0.2)", // Semi-transparent input
                           borderRadius: 2,
                           "& .MuiOutlinedInput-root": {
                             background: "rgba(255, 255, 255, 0.2)", // Ensures input stays semi-transparent
                             color: "#fff", // White text inside input
                             "& fieldset": {
                               borderColor: "rgba(255, 255, 255, 0.5)", // Softer border
                             },
                             "&:hover fieldset": {
                               borderColor: "#fff",
                             },
                             "&.Mui-focused fieldset": {
                               borderColor: "#fff",
                               boxShadow: "0px 0px 8px #fff",
                             },
                           },
                           "& .MuiInputLabel-root": {
                             color: "rgba(255, 255, 255, 0.7)", // Light label color
                           },
                           "& .MuiInputLabel-root.Mui-focused": {
                             color: "#fff", // White when focused
                           },
                           "& .MuiInputBase-input": {
                             color: "#fff",
                           },
                         }}
                         fullWidth
                         label="Email"
                         {...register("email")}
                         error={Boolean(errors.email)}
                         helperText={errors.email?.message}
                       />
          <PasswordInput
              sx={{
                mt: 2,
                background: "rgba(255, 255, 255, 0.2)", // Semi-transparent input
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                    boxShadow: "0px 0px 8px #fff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
              fullWidth
              label="Password"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <PasswordInput
              sx={{
                mt: 2,
                background: "rgba(255, 255, 255, 0.2)", // Semi-transparent input
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                    boxShadow: "0px 0px 8px #fff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
                          type="submit"
                          sx={{
                            mt: 4,
                            py: 1.5,
                            fontSize: "1rem",
                            fontWeight: "bold",
                            borderRadius: 3,
                            background: "linear-gradient(90deg, #ff6b6b, #ffcc00)",
                            ":hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0px 6px 25px rgba(255, 102, 102, 0.5)",
                            },
                          }}
                          variant="contained"
                          fullWidth
                          disabled={!isValid || isLoading}
                        >
                          {isLoading ? "Loading..." : "Sign Up"}
                        </Button>

             <Typography textAlign="center" mt={2} variant="body2" color="#fff">
                          Already have an account?{" "}
                          <NavLink to="/login" style={{ color: "#ffcc00", fontWeight: "bold", textDecoration: "none" }}>
                            login
                          </NavLink>
                        </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
