import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', qty: '', uom: '', price: '' });
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem('inventory')) || [
      { id: 1, name: 'Aren Sugar', qty: '1', uom: 'kg', price: 60.0 },
      { id: 2, name: 'Milk', qty: '1', uom: 'Liter', price: 30.0 },
      { id: 3, name: 'Ice Cube', qty: '1', uom: 'kg', price: 15.0 },
      { id: 4, name: 'Plastic Cup', qty: '10', uom: 'pcs', price: 5.0 },
      { id: 5, name: 'Coffee Bean', qty: '1', uom: 'kg', price: 100.0 },
      { id: 6, name: 'Mineral Water', qty: '1', uom: 'Liter', price: 5.0 },
    ];
    setInventory(storedInventory);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.qty || !newItem.uom || !newItem.price) {
      return;
    }
    const updatedInventory = [...inventory, { ...newItem, id: Date.now() }];
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    setNewItem({ name: '', qty: '', uom: '', price: '' });
    setModalOpen(false);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setModalOpen(true);
    setNewItem({ name: item.name, qty: item.qty, uom: item.uom, price: item.price });
  };

  const handleSaveEdit = () => {
    const updatedInventory = inventory.map(item =>
      item.id === currentItem.id ? { ...currentItem, ...newItem } : item
    );
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    setModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    const updatedInventory = inventory.filter(item => item.id !== id);
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentItem(null);
    setNewItem({ name: '', qty: '', uom: '', price: '' });
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedItems = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Inventory Management</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            label="Search Inventory"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={4} textAlign="right">
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Add Item
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.uom}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditItem(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredInventory.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mb: 2 }}
      />
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>{currentItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            fullWidth
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Quantity"
            fullWidth
            value={newItem.qty}
            onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="UOM"
            fullWidth
            value={newItem.uom}
            onChange={(e) => setNewItem({ ...newItem, uom: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price per Quantity"
            fullWidth
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={currentItem ? handleSaveEdit : handleAddItem} variant="contained">
            {currentItem ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryPage;
