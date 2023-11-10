import React from 'react';

const NuevaImagenPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="NuevaImagenPage">
      <h3>Nueva imagen</h3>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" name="title" />
        <br />
        <label>Selecciona la imagen:</label>
        <input type="text" name="img" />
        <br />
        <button type="submit">Añadir imagen</button>
      </form>
    </div>
  );
};

export default NuevaImagenPage;
