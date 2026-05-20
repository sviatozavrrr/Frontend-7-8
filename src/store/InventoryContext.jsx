import { createContext, useContext, useState } from 'react';

const InventoryContext = createContext(null);

// Читаємо з localStorage при старті, якщо порожньо — починаємо з []
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (data) => {
  localStorage.setItem('inventory', JSON.stringify(data));
};

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState(loadFromStorage);

  // Оновлюємо стейт і одразу зберігаємо в localStorage
  const setAndSave = (updater) => {
    setInventory(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage(next);
      return next;
    });
  };

  const addItem = (newItem) => {
    const id = Date.now();
    setAndSave(prev => [...prev, { ...newItem, id }]);
  };

  const updateItem = (id, updatedFields) => {
    setAndSave(prev =>
      prev.map(item => item.id === id ? { ...item, ...updatedFields } : item)
    );
  };

  const deleteItem = (id) => {
    setAndSave(prev => prev.filter(item => item.id !== id));
  };

  const getItemById = (id) => inventory.find(item => item.id === Number(id));

  return (
    <InventoryContext.Provider value={{ inventory, addItem, updateItem, deleteItem, getItemById }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);