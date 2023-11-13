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

  const handleEditSubmit = async (id, editedTitle, editedImage) => {
    try {
      const formData = new FormData();
      formData.append('title', editedTitle);
      formData.append('imagen', editedImage);

      const response = await fetch(`http://localhost:5005/api/images/${id}`, {
        method: 'PATCH',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al editar la imagen en el servidor.');
      }

      // Actualizar el estado con el nombre editado
      setImagenes((prevImagenes) =>
        prevImagenes.map((imagen) =>
          imagen._id === id ? { ...imagen, title: editedTitle } : imagen
        )
      );
    } catch (error) {
      console.error(error);
      setError('Error al editar la imagen en el servidor.');
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
          <p>Nombre: {imagen.title}</p>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const editedTitle = e.target.title.value;
              const editedImage = e.target.imagen.files[0];

              if (editedTitle.trim() || editedImage) {
                handleEditSubmit(imagen._id, editedTitle, editedImage);
              }
            }}
          >
            <label>Editar Nombre:</label>
            <input type="text" name="title" defaultValue={imagen.title} />
            <label>Editar Imagen:</label>
            <input type="file" name="imagen" accept="image/*" />
            <button type="submit">Guardar</button>
          </form>
          <button onClick={() => handleDeleteClick(imagen._id)}>Borrar</button>
        </div>
      ))}
    </div>
  );
};

export default ImagenesFavoritas;
