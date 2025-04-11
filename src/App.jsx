import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import ubicacionImg from './assets/imagenes/ubicacion.png';
import condominioImg from './assets/imagenes/condominio.png';
import serviciosImg from './assets/imagenes/servicios.png';
import usuarioImg from './assets/imagenes/usuario.png';
import fondoImg from './assets/imagenes/fondo.jpg';

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="nav-center">
          <button className="nav-item">
            <img src={ubicacionImg} alt="Ubicación" className="nav-icon" />
            <span>Ubicación</span>
          </button>
          <Link to="/condominios/condominio">
            <button className="nav-item">
              <img src={condominioImg} alt="Condominios" className="nav-icon" />
              <span>Condominios</span>
            </button>
          </Link>
          <Link to="./pagar">
            <button className="nav-item">
              <img src={serviciosImg} alt="Servicios" className="nav-icon" />
              <span>Servicios</span>
            </button>
          </Link>
        </div>
        <Link to="/usuario/login" className="profile-icon">
          <img src={usuarioImg} alt="Perfil" />
          <span>Perfil</span>
        </Link>
      </header>

      <main className="main-content">
        <img src={fondoImg} alt="Condominios" className="condo-image" />
      </main>

      <a
        href="https://wa.me/1234567890"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </div>
  );
};

export default App;
