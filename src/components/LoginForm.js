import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const validateEmail = (email) =>
  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);

const generateToken = () => Math.random().toString(36).substr(2); // Generate a random string

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" || false
  );
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(async () => {
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(
        `A magic link has been sent to ${email}. Please check your inbox.`
      );

      const token = generateToken();
      setAuthToken(token);

      setIsAuthenticated(false);
    } catch (err) {
      setError("Failed to send magic link. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  const handleMagicLinkClick = () => {
    signIn();
    navigate("/inventory");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sign in
      </Typography>

      <TextField
        fullWidth
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
        error={!!error}
        helperText={error}
      />

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        onClick={handleSubmit}
        loading={loading}
        sx={{ mb: 2 }}
      >
        Send Magic Link
      </LoadingButton>

      {success && !isAuthenticated && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}

      {success && !isAuthenticated && (
        <LoadingButton
          fullWidth
          size="large"
          variant="outlined"
          onClick={handleMagicLinkClick}
          sx={{ mb: 2 }}
        >
          Click to Authenticate (Simulated Magic Link)
        </LoadingButton>
      )}

      {isAuthenticated && authToken && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          Authentication successful! Your token: <strong>{authToken}</strong>
        </Typography>
      )}

      {error && <Typography color="error.main">{error}</Typography>}
    </Box>
  );
};

export default LoginForm;
