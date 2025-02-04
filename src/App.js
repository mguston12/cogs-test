import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import LoginPage from "./pages/LoginPage";
import InventoryPage from "./pages/InventoryPage";
import RecipePage from "./pages/RecipePage";
import PrivateRoute from "./components/PrivateRoute"; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Iced Coffee Inventory & COGS
            </Typography>
            <AuthLinks />
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path="/sign-in" element={<LoginPage />} />
            <Route
              path="/inventory"
              element={<PrivateRoute element={<InventoryPage />} />}
            />
            <Route
              path="/recipe"
              element={<PrivateRoute element={<RecipePage />} />}
            />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

const AuthLinks = () => {
  const { isAuthenticated, signOut } = useAuth();

  return isAuthenticated ? (
    <>
      <Button color="inherit" href="/inventory">
        Inventory
      </Button>
      <Button color="inherit" href="/recipe">
        Recipe
      </Button>
      <Button color="inherit" onClick={signOut}>
        Sign out
      </Button>
    </>
  ) : (
    <Button color="inherit" href="/sign-in">
      Sign in
    </Button>
  );
};

export default App;
