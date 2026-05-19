import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate'; // Додано імпорт

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminInventory />} />
        <Route path="/edit/:id" element={<AdminInventoryEdit />} />
        <Route path="/create" element={<AdminInventoryCreate />} />
        <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;