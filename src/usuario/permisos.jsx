import React from 'react';
import './acciones.css';

const Permisos = () => {
  const permisosEjemplo = [
    { fecha: '2025-01-10', solicitud: 'Permiso de salida' },
    { fecha: '2025-02-14', solicitud: 'Permiso especial' },
    { fecha: '2025-03-22', solicitud: 'Permiso de horario' },
  ];

  return (
    <div className="acciones-container">
      <h1>Permisos</h1>
      <table className="tabla-acciones">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre de la Solicitud</th>
          </tr>
        </thead>
        <tbody>
          {permisosEjemplo.map((permiso, index) => (
            <tr key={index}>
              <td>{permiso.fecha}</td>
              <td>{permiso.solicitud}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permisos;
