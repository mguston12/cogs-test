import React, { createContext, useState, useContext } from 'react';

// Create a context
const InventoryContext = createContext();

// Create a provider component
export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Aren Sugar', qty: 1, uom: 'kg', price: 60.0 },
    { id: 2, name: 'Milk', qty: 1, uom: 'Liter', price: 30.0 },
    { id: 3, name: 'Ice Cube', qty: 1, uom: 'kg', price: 15.0 },
    { id: 4, name: 'Plastic Cup', qty: 10, uom: 'pcs', price: 5.0 },
    { id: 5, name: 'Coffee Bean', qty: 1, uom: 'kg', price: 100.0 },
    { id: 6, name: 'Mineral Water', qty: 1, uom: 'Liter', price: 5.0 },
  ]);

  // Functions to manipulate inventory
  const addItem = (item) => {
    setInventory([...inventory, item]);
  };

  const editItem = (id, updatedItem) => {
    setInventory(inventory.map((item) => (item.id === id ? updatedItem : item)));
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem, editItem, deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use inventory context
export const useInventory = () => {
  return useContext(InventoryContext);
};
