import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './agregarMulta.css';

const AgregarMulta = () => {
  const [multaData, setMultaData] = useState({
    monto: '',
    descripcion: '',
    fecha: '',
    departamento: '',
  });

  const token = localStorage.getItem('token');

  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await fetch('https://apicondominio-p4vc.onrender.com/api/obtener_departamentos',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const result = await response.json();
        setDepartamentos(result);
      } catch (error) {
        console.error('Error al obtener departamentos:', error);
      }
    };
    fetchDepartamentos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMultaData({ ...multaData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar estado de carga

    try {
      const response = await fetch('https://apicondominio-p4vc.onrender.com/api/agregar_multa', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(multaData),
      });
      const result = await response.json();

      setModalMessage(response.ok ? 'Multa agregada exitosamente' : result.message || 'Error al agregar multa');
      setShowModal(true); // Mostrar modal con animación
    } catch (error) {
      setModalMessage('Error al agregar multa');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agregar-multa-container">
      <h1>Agregar Multa</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="monto">Monto</label>
        <input type="text" id="monto" name="monto" value={multaData.monto} onChange={handleChange} />

        <label htmlFor="descripcion">Descripción</label>
        <input type="text" id="descripcion" name="descripcion" value={multaData.descripcion} onChange={handleChange} />

        <label htmlFor="fecha">Fecha</label>
        <input type="date" id="fecha" name="fecha" value={multaData.fecha} onChange={handleChange} />

        <label htmlFor="departamento">Departamento</label>
        <select id="departamento" name="departamento" value={multaData.departamento} onChange={handleChange}>
          <option value="">Selecciona un departamento</option>
          {departamentos.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.numero} {dep.lugar}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Agregar Multa'}
        </button>
      </form>

      {/* Modal con transición */}
      <CSSTransition in={showModal} timeout={300} classNames="modal" unmountOnExit>
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default AgregarMulta;
