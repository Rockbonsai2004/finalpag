import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './pagar.css'

const Pagar = () => {
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [opcion, setOpcion] = useState(null);
  const navigate = useNavigate(); // Definir navigate

  const handleCelularChange = (e) => setCelular(e.target.value);
  const handleDireccionChange = (e) => setDireccion(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (celular && direccion) {
      setOpcion(true); // Mostrar las opciones
    }
  };

  const handlePagar = () => {
    navigate('/pagar'); // Redirigir a la ruta de pago
  };

  return (
    <div className="pagosContainer">
      <h1 className="title">Formulario de Pagos</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="celular">Número de Celular</label>
          <input
            type="tel"
            id="celular"
            value={celular}
            onChange={handleCelularChange}
            placeholder="Ingresa tu número"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={handleDireccionChange}
            placeholder="Ingresa tu dirección"
            required
          />
        </div>
        <button type="submit" className="submitButton">
          Enviar
        </button>
      </form>

      {opcion && (
        <div className="options">
          <div className="option">
            <h2>Pagos</h2>
            <button className="optionButton" onClick={handlePagar}>Pagar</button> {/* Agregar la acción de redirección */}
            <button className="optionButton">Historial</button>
          </div>
          <div className="option">
            <h2>Multas</h2>
            <button className="optionButton">Ver Multas</button>
            <button className="optionButton">Historial</button>
          </div>
          <div className="option">
            <h2>Permisos</h2>
            <button className="optionButton">Agregar Permiso</button>
            <button className="optionButton">Historial</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagar;
