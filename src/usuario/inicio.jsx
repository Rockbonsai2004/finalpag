import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inicio.css';
import Navbar from './navbar';
import ProtectedRoute from './protect';

const Inicio = () => {
  const [showModal, setShowModal] = useState(false); // Para mostrar el modal de confirmación
  const [rememberMe, setRememberMe] = useState(false); // Para manejar la opción "Recordarme"
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión en este dispositivo
  const handleLogoutThisDevice = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!rememberMe) {
        // Si "Recordarme" es falso, borra el token del localStorage
        localStorage.removeItem('token');
      }

      const url = 'https://apicondominio-p4vc.onrender.com/api/logout';
      const body = { recordarme: rememberMe };

      await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      navigate('/usuario/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Función para manejar el cierre de sesión en todos los dispositivos
  const handleLogoutAllDevices = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = 'https://apicondominio-p4vc.onrender.com/api/logoutAll';

      const body = { recordarme: rememberMe };

      await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      navigate('/usuario/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="inicio-container">
      <Navbar />
      <ProtectedRoute />
      <h1>¡Hola, bienvenido a la página de inicio!</h1>

      {/* Botón de Cerrar Sesión */}
      <button
        className="logout-btn"
        onClick={() => setShowModal(true)} // Mostrar el modal de confirmación
      >
        Cerrar sesión
      </button>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Deseas cerrar sesión?</h2>
            <p>Elige si quieres salir solo en este dispositivo o en todos los dispositivos:</p>
            <div className="modal-buttons">
              {/* Botón de Cerrar sesión solo en este dispositivo */}
              <button onClick={handleLogoutThisDevice}>
                Cerrar solo en este dispositivo
              </button>
              {/* Botón de Cerrar sesión en todos los dispositivos */}
              <button onClick={handleLogoutAllDevices}>
                Cerrar en todos los dispositivos
              </button>
              {/* Check de "Recordarme" debajo del botón "Cerrar solo en este dispositivo" */}
              <label>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                />
                Recordarme
              </label>
              {/* Botón de Cancelar */}
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
