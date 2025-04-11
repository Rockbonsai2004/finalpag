import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Trash } from "lucide-react";

const Navbar = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Leer userId y token desde localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("userId leído desde localStorage:", userId);
    console.log("token leído desde localStorage:", token);

    const fetchNotifications = async () => {
      if (!userId || !token) return;
      try {
        const response = await fetch(
          `https://apicondominio-p4vc.onrender.com/api/notificaciones/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        console.log("Resultado de la API:", result);
        if (Array.isArray(result)) {
          setNotificaciones(result);
        } else {
          setNotificaciones([]);
        }
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    const validateToken = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          "https://apicondominio-p4vc.onrender.com/api/verificar_token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.warn("Token inválido, cerrando sesión");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/usuario/login");
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
      }
    };

    if (userId && token) {
      fetchNotifications();
      const intervalNotif = setInterval(fetchNotifications, 5000);
      const intervalToken = setInterval(validateToken, 5000);
      return () => {
        clearInterval(intervalNotif);
        clearInterval(intervalToken);
      };
    }
  }, [userId, token, navigate]);

  const handleDeleteNotification = async (notificacionId) => {
    try {
      await fetch(
        `https://apicondominio-p4vc.onrender.com/api/notificaciones/${notificacionId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotificaciones((prev) => prev.filter((notif) => notif._id !== notificacionId));
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">🏠 Condominio</div>
      <ul className="nav-links">
        <li>
          <Link to="/usuario/inicio">Inicio</Link>
        </li>
        <li>
          <Link to="/usuario/multauser">Multas</Link>
        </li>
        <li>
          <Link to="/usuario/permisouser">Permisos</Link>
        </li>
        <li>
          <Link to="/usuario/cambiarcontraseña">Usuario</Link>
        </li>
      </ul>
      <div className="notifications">
        <div className="bell-container" onClick={() => setIsOpen(!isOpen)}>
          <Bell className={`notification-icon ${notificaciones.length > 0 ? "new-notification" : ""}`} />
          {notificaciones.length > 0 && <span className="badge">{notificaciones.length}</span>}
        </div>

        {isOpen && (
          <div className="notifications-panel">
            <h3>Notificaciones</h3>
            {notificaciones.length === 0 ? (
              <p>No hay notificaciones</p>
            ) : (
              <ul>
                {notificaciones.map((notif) => (
                  <li key={notif._id} className="notification-item">
                    <span>{notif.mensaje}</span>
                    <button className="delete-btn" onClick={() => handleDeleteNotification(notif._id)}>
                      <Trash size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setIsOpen(false)}>Cerrar</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
