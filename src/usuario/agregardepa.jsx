import React, { useState } from 'react';
import './agregarDepa.css';

const AgregarDepa = () => {
  const [depaData, setDepaData] = useState({
    numero: '',
    lugar: '',
  });

  const token = localStorage.getItem('token');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepaData({ ...depaData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://apicondominio-p4vc.onrender.com/api/agregar_depa', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(depaData),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Departamento agregado exitosamente');
      } else {
        alert(result.message || 'Error al agregar departamento');
      }
    } catch (error) {
      console.error('Error al agregar departamento:', error);
      alert('Error al agregar departamento');
    }
  };

  return (
    <div className="agregar-depa-container">
      <h1>Agregar Departamento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numero">Número</label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={depaData.numero}
          onChange={handleChange}
        />
        <label htmlFor="lugar">Lugar</label>
        <input
          type="text"
          id="lugar"
          name="lugar"
          value={depaData.lugar}
          onChange={handleChange}
        />
        <button type="submit">Agregar Departamento</button>
      </form>
    </div>
  );
};

export default AgregarDepa;
