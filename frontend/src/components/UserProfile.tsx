import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";

const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 chars required")
    .max(16, "Maximum 16 chars allowed"),
});

type FormData = yup.InferType<typeof validation>;

const UserProfile: React.FC = () => {
  const [user, setUser] = useState({
    _id: "1234",
    name: "Test User",
    email: "test@example.com",
    role: "User",
    imageUrl: null as string | null,
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(user.imageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      email: user.email,
      password: "",
      name: user.name,
    },
    resolver: yupResolver(validation),
  });

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setProfileImage(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    },
    []
  );

  const handleImageUpload = useCallback(() => {
    if (!profileImage) return toast.error("Please select an image first.");
    toast.success("Image uploaded successfully!");
  }, [profileImage]);

  const handleUpdateProfile = useCallback(
    (updationData: FormData) => {
      setUser((prevUser) => ({
        ...prevUser,
        name: updationData.name,
        email: updationData.email,
      }));
      toast.success("Profile updated successfully!");
    },
    []
  );

  const avatarUrl = useMemo(() => {
    return previewImage || `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`;
  }, [previewImage, user.name]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #3a1c71, #640D5F)",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <Box
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 800,
          borderRadius: 3,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
          background: "rgba(255, 255, 255, 0.1)", // Semi-transparent effect
          backdropFilter: "blur(10px)", // Glass effect
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Avatar
              src={avatarUrl}
              alt="Profile"
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.8)",
                border: "3px solid #FFD700",
              }}
            />
            <Typography variant="h6" sx={{ color: "#FFD700", fontWeight: "bold" }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)">
              {user.email}
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)">
              Role: {user.role}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <input
              accept="image/*"
              type="file"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-image">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  color: "#FFD700",
                  borderColor: "#FFD700",
                  "&:hover": { backgroundColor: "rgba(255, 215, 0, 0.2)" },
                }}
              >
                Choose Image
              </Button>
            </label>
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "#FFD700",
                color: "#3a1c71",
                "&:hover": { backgroundColor: "#E5C100" },
              }}
              onClick={handleImageUpload}
            >
              Upload
            </Button>

            <Box mt={3}>
              <Box
                gap="8px"
                display="flex"
                flexDirection={"column"}
                component="form"
                onSubmit={handleSubmit(handleUpdateProfile)}
              >
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Name"
                  label="Name"
                  {...register("name")}
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                  }}
                  InputLabelProps={{ sx: { color: "#fff" } }}
                />
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Email"
                  label="Email"
                  {...register("email")}
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                  }}
                  InputLabelProps={{ sx: { color: "#fff" } }}
                />
                <PasswordInput
                  fullWidth
                  type="password"
                  placeholder="Confirm Password"
                  label="Confirm password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password")}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isDirty || !isValid}
                  sx={{
                    mt: 2,
                    backgroundColor: "#FFD700",
                    color: "#3a1c71",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#E5C100" },
                  }}
                >
                  Update Profile
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;