import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import ListaImagenesFavoritasPage from './pages/ListaImagenesFavoritasPage';
import NuevaImagenPage from './pages/NuevaImagenPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaImagenesFavoritasPage />} />
        <Route path="/imagenes/new" element={<NuevaImagenPage />} />
      </Routes>
    </div>
  );
}

export default App;
