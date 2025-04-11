import React, { useState } from 'react';

const CambiarContraseña = () => {
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://apicondominio-p4vc.onrender.com/api/cambiar_contra', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contraseñaActual, nuevaContraseña }),
      });

      const data = await response.json();
      setMensaje(data.message);
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contraseña Actual:</label>
          <input
            type="password"
            value={contraseñaActual}
            onChange={(e) => setContraseñaActual(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cambiar Contraseña</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CambiarContraseña;
