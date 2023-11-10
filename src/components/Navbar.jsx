import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink to="/">
        <button>Galería de imágenes</button>
      </NavLink>

      <NavLink to="/imagenes/new">
        <button>Añadir nueva imagen</button>
      </NavLink>
    </nav>
  );
}

export default Navbar;
