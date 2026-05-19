import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate'; 
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails'; 
import Gallery from './pages/Gallery'; 


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AdminInventory />} />
        <Route path="/edit/:id" element={<AdminInventoryEdit />} />
        <Route path="/create" element={<AdminInventoryCreate />} />
        <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
        <Route path="/gallery" element={<Gallery />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;