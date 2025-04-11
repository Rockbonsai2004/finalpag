import React from 'react';
import { useNavigate } from 'react-router-dom';
import './usuario.css';

// Importa las imágenes desde src/assets/imagenes
import masImg from '../assets/imagenes/mas.png';
import pagoImg from '../assets/imagenes/pago.png';
import multaImg from '../assets/imagenes/multa.png';
import permisoImg from '../assets/imagenes/permiso.png';
import agregarMultaImg from '../assets/imagenes/mas.png'; // Agrega la imagen para "Agregar Multa"

const Usuarios = () => {
  const navigate = useNavigate();

  const data = [
    { nombre: 'Edson Pérez', perfil: 'Administrador' },
    { nombre: 'Pancho López', perfil: 'Jefe' },
    { nombre: 'Webos Ruiz', perfil: 'Usuario' },
  ];

  const handleAgregar = () => {
    navigate('/usuario/nuevo_user');
  };

  const handlePagos = () => {
    navigate('/usuario/pagos');
  };

  const handleMultas = () => {
    navigate('/usuario/multas');
  };

  const handlePermisos = () => {
    navigate('/usuario/permisos');
  };

  const handleAgregarMulta = () => {
    navigate('/usuario/agregarmulta'); // Redirige a la página de agregar multa
  };

  const handleAgregarDepa = () => {
    navigate('/usuario/agregardepa'); // Redirige a la página de agregar multa
  };

  return (
    <div className="usuarios-container">
      <h1>Gestión de Usuarios</h1>
      <button className="btn-agregar" onClick={handleAgregar}>
        <img src={masImg} alt="Agregar" className="btn-icon" />
        Agregar
      </button>
      {/* Botón para agregar multa */}
      <button className="btn-agregar" onClick={handleAgregarMulta}>
        <img src={agregarMultaImg} alt="Agregar Multa" className="btn-icon" />
        Agregar Multa
      </button>

      <button className="btn-agregar" onClick={handleAgregarDepa}>
        <img src={agregarMultaImg} alt="Agregar Multa" className="btn-icon" />
        Agregar Depa
      </button>
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Perfil</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((usuario, index) => (
            <tr key={index}>
              <td className="tabla-texto">{usuario.nombre}</td>
              <td className="tabla-texto">{usuario.perfil}</td>
              <td>
                <button className="btn-accion" onClick={handlePagos}>
                  <img src={pagoImg} alt="Pagos" className="btn-icon" />
                  Pagos
                </button>
                <button className="btn-accion btn-multas" onClick={handleMultas}>
                  <img src={multaImg} alt="Multas" className="btn-icon" />
                  Multas
                </button>
                <button className="btn-accion btn-permisos" onClick={handlePermisos}>
                  <img src={permisoImg} alt="Permisos" className="btn-icon" />
                  Permisos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
