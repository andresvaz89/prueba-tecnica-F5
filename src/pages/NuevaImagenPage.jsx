import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NuevaImagenPage = () => {
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Obtener la función de navegación

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Manejando envío de formulario');

    if (!imagen) {
      setError('Por favor, selecciona una imagen.');
      return;
    }

    if (imagen.size > 15 * 1024 * 1024) {
      setError('La imagen no debe pesar más de 15 megas.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', event.target.title.value);
      formData.append('imagen', imagen);

      const response = await fetch('http://localhost:5005/api/images', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al enviar la imagen al servidor.');
      }

      // Resto del código si la respuesta es exitosa
      console.log('Imagen enviada con éxito al servidor.');
      setError('');

      // Navegar a ListaImagenesFavoritasPage.jsx después de cargar la imagen
      navigate('/');
    } catch (error) {
      setError('Error al enviar la imagen al servidor.');
      console.error('Error al enviar la imagen al servidor:', error);
      console.log('Error message:', error.message);
      console.log('Error stack:', error.stack);
      setError('Error al enviar la imagen al servidor.');
    }
  };

  const handleImagenChange = (event) => {
    const nuevaImagen = event.target.files[0];
    console.log('Manejando cambio de imagen');

    if (nuevaImagen && nuevaImagen.size > 15 * 1024 * 1024) {
      setError('La imagen no debe pesar más de 15 megas.');
      setImagen(null);
      setImagenPreview(null);
      return;
    }

    setImagen(nuevaImagen);
    setError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenPreview(reader.result);
    };

    if (nuevaImagen) {
      reader.readAsDataURL(nuevaImagen);
    } else {
      setImagenPreview(null);
    }
  };

  return (
    <div className="NuevaImagenPage">
      <h3>Nueva imagen</h3>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" name="title" />
        <br />
        <label>Selecciona la imagen:</label>
        <input
          type="file"
          name="imagen"
          onChange={handleImagenChange}
          accept="image/*"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        {imagenPreview && (
          <div>
            <h4>Vista previa de la imagen:</h4>
            <img
              src={imagenPreview}
              alt="Vista previa"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </div>
        )}
        <br />
        <button type="submit">Añadir imagen</button>
      </form>
    </div>
  );
};

export default NuevaImagenPage;
