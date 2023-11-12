import React, { useState, useEffect } from 'react';

const ImagenesFavoritas = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/images');
        if (!response.ok) {
          throw new Error('Error al obtener las imágenes del servidor.');
        }
        const data = await response.json();
        setImagenes(data);
      } catch (error) {
        setError('Error al obtener las imágenes del servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchImagenes();
  }, [setImagenes]);

  if (loading) {
    return <p>Cargando imágenes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Lista de imágenes</h3>
      {imagenes.map((imagen) => (
        <img
          key={imagen._id}
          src={`data:${
            imagen.image.contentType
          };base64,${imagen.image.data.toString('base64')}`}
          alt={imagen.title}
          style={{ maxWidth: '100%', maxHeight: '200px', margin: '10px' }}
        />
      ))}
    </div>
  );
};

export default ImagenesFavoritas;
