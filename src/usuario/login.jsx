import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './usuario.css';

const Login = () => {
  const [telefono, setTelefono] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [telefonoRecuperacion, setTelefonoRecuperacion] = useState(''); // Nuevo estado para el modal
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://apicondominio-p4vc.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefono, contraseña }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        if (data.perfil === 'Administrador') {
          navigate('/usuario/usuarios');
        } else {
          navigate('/usuario/inicio');
        }
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al conectar con el servidor');
    }
  };

  // Función para manejar el envío del teléfono para la recuperación
  const handleRecoverPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://apicondominio-p4vc.onrender.com/api/recuperar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefono: telefonoRecuperacion }), // Enviar el teléfono directamente
      });
      const data = await response.json();
      if (response.ok) {
        alert('Se ha enviado el link de recuperación al correo registrado');
        setShowModal(false); // Cerrar el modal
        setTelefonoRecuperacion(''); // Limpiar campo
      } else {
        setError(data.message || 'Error al recuperar contraseña');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="telefono">Num. telefónico:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>

      {/* Botón para abrir el modal de recuperación */}
      <button onClick={() => setShowModal(true)} className="recuperar-btn">Recuperar Contraseña</button>

      {/* Modal de recuperación */}
      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <h2>Recuperación de Contraseña</h2>
            <form onSubmit={handleRecoverPassword}>
              <div className="form-group">
                <label htmlFor="telefonoRecuperacion">Num. telefónico:</label>
                <input
                  type="text"
                  id="telefonoRecuperacion"
                  name="telefonoRecuperacion"
                  value={telefonoRecuperacion} // Usamos telefonoRecuperacion
                  onChange={(e) => setTelefonoRecuperacion(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">Enviar Link de Recuperación</button>
            </form>
            <button onClick={() => setShowModal(false)} className="cerrar-modal">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
