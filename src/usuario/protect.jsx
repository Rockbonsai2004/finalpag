import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // O sessionStorage.getItem('token') si usas sessionStorage
    if (!token) {
      navigate('/usuario/login'); // Redirige a login si no hay token
    } else {
      setIsAuthenticated(true); // Si hay token, mantiene la sesión
    }
  }, [navigate]);

  return isAuthenticated ? children : null; // Muestra el contenido solo si está autenticado
};

export default ProtectedRoute;
