import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";

const RecipePage = () => {
  const recipe = {
    "Aren Sugar": { quantity: 15, uom: "g" },
    Milk: { quantity: 150, uom: "ml" },
    "Ice Cube": { quantity: 20, uom: "g" },
    "Plastic Cup": { quantity: 1, uom: "pcs" },
    "Coffee Bean": { quantity: 20, uom: "g" },
    "Mineral Water": { quantity: 50, uom: "ml" },
  };

  const [inventory, setInventory] = useState([]);
  const [cups, setCups] = useState(1);
  const [totalCOGS, setTotalCOGS] = useState(0);

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [
      { id: 1, name: "Aren Sugar", qty: "1 kg", uom: "kg", price: 60.0 },
      { id: 2, name: "Milk", qty: "1 Liter", uom: "Liter", price: 30.0 },
      { id: 3, name: "Ice Cube", qty: "1 Kg", uom: "kg", price: 15.0 },
      { id: 4, name: "Plastic Cup", qty: "10 pcs", uom: "pcs", price: 5.0 },
      { id: 5, name: "Coffee Bean", qty: "1 kg", uom: "kg", price: 100.0 },
      {
        id: 6,
        name: "Mineral Water",
        qty: "1 Liter",
        uom: "Liter",
        price: 5.0,
      },
    ];
    setInventory(storedInventory);
  }, []);

  const calculateCOGS = () => {
    let total = 0;

    Object.entries(recipe).forEach(([ingredient, { quantity, uom }]) => {
      const inventoryItem = inventory.find((item) => item.name === ingredient);
      if (inventoryItem) {
        const unitPrice = inventoryItem.price;
        let ingredientCost = 0;

        const availableQty = parseFloat(inventoryItem.qty);

        if (uom === "g" || uom === "ml") {
          ingredientCost = (unitPrice / (availableQty * 1000)) * quantity;
        } else if (uom === "pcs") {
          ingredientCost = (unitPrice / availableQty) * quantity;
        }

        total += ingredientCost * cups;
      }
    });

    setTotalCOGS(total);
  };

  const handleCupsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCups(value >= 1 ? value : 1); // Ensure the value is at least 1
  };

  const handleCalculate = () => {
    if (cups < 1) {
      alert("Please enter a valid number of cups.");
      return;
    }
    calculateCOGS();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Iced Coffee COGS Calculator
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          {/* Row 1: TextField */}
          <Grid item xs={12}>
            <TextField
              label="Number of Cups"
              type="number"
              variant="outlined"
              fullWidth
              value={cups}
              onChange={handleCupsChange}
              inputProps={{ min: 1 }}
            />
          </Grid>
          {/* Row 2: Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleCalculate}
              sx={{ height: "50px" }}
            >
              Calculate COGS
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Total COGS for {cups} cup{cups > 1 ? "s" : ""}:{" "}
        <strong>${totalCOGS.toFixed(2)}</strong>
      </Typography>
    </Box>
  );
};

export default RecipePage;
