import React, { useState } from 'react';

const NuevaImagenPage = () => {
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (imagen && imagen.size > 15 * 1024 * 1024) {
      setError('La imagen no debe pesar más de 15 megas.');
      return;
    }

    // Resto del código para enviar la imagen al servidor
    console.log('Imagen seleccionada:', imagen);
    setError('');
  };

  const handleImagenChange = (event) => {
    const nuevaImagen = event.target.files[0];

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
