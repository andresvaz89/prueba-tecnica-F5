import React, { useState, useEffect } from 'react';

function arrayBufferToBase64(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}
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
        console.error(error);
        setError('Error al obtener las imágenes del servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchImagenes();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:5005/api/images/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al borrar la imagen del servidor.');
      }

      // Filtrar las imágenes para remover la que acabamos de borrar
      setImagenes((prevImagenes) =>
        prevImagenes.filter((imagen) => imagen._id !== id)
      );
    } catch (error) {
      console.error(error);
      setError('Error al borrar la imagen del servidor.');
    }
  };

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
        <div key={imagen._id} style={{ marginBottom: '20px' }}>
          <img
            src={`data:${imagen.image.contentType};base64,${arrayBufferToBase64(
              imagen.image.data.data
            ).toString('base64')}`}
            alt={imagen.title}
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              marginBottom: '10px'
            }}
          />
          <button onClick={() => handleDeleteClick(imagen._id)}>Borrar</button>
        </div>
      ))}
    </div>
  );
};

export default ImagenesFavoritas;
