import React from 'react';
import './acciones.css';

const Multas = () => {
  const multasEjemplo = [
    { monto: '$500', fecha: '2024-12-20' },
    { monto: '$1200', fecha: '2025-01-05' },
    { monto: '$300', fecha: '2025-01-15' },
  ];

  return (
    <div className="acciones-container">
      <h1>Multas</h1>
      <table className="tabla-acciones">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Fecha de Multa</th>
          </tr>
        </thead>
        <tbody>
          {multasEjemplo.map((multa, index) => (
            <tr key={index}>
              <td>{multa.monto}</td>
              <td>{multa.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Multas;
