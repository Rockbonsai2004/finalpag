import React from 'react';
import './acciones.css';

const Pagos = () => {
  const pagosEjemplo = [
    { monto: '$1500', fecha: '2025-01-01' },
    { monto: '$2300', fecha: '2025-02-15' },
    { monto: '$800', fecha: '2025-03-10' },
  ];

  return (
    <div className="acciones-container">
      <h1>Pagos</h1>
      <table className="tabla-acciones">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {pagosEjemplo.map((pago, index) => (
            <tr key={index}>
              <td>{pago.monto}</td>
              <td>{pago.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pagos;
