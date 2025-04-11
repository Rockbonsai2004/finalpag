import React, { useState, useEffect } from 'react';
import './acciones.css';

const NuevoUser = () => {
  const [formData, setFormData] = useState({
    telefono: '',
    nombre: '',
    contraseña: '',
    confirmarContraseña: '',
    perfil: 'Usuario', // Perfil predeterminado
    departamento: 'No aplica', // Por defecto no aplica
  });

  const token = localStorage.getItem('token');

  const [departamentos, setDepartamentos] = useState([]);

  // Cargar los departamentos desde la API
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contraseña !== formData.confirmarContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('https://apicondominio-p4vc.onrender.com/api/crear_usuario', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Usuario agregado exitosamente');
        setFormData({
          telefono: '',
          nombre: '',
          contraseña: '',
          confirmarContraseña: '',
          perfil: 'Usuario',
          departamento: 'No aplica', // Resetear departamento
        });
      } else {
        alert(result.message || 'Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      alert('Error al agregar usuario');
    }
  };

  return (
    <div className="acciones-container">
      <h1>Agregar Nuevo Usuario</h1>
      <form className="form-nuevo-user" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="telefono">Número Telefónico:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmarContraseña"
            name="confirmarContraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="perfil">Perfil:</label>
          <select
            id="perfil"
            name="perfil"
            value={formData.perfil}
            onChange={handleChange}
            required
          >
            <option value="Usuario">Usuario</option>
            <option value="Jefe">Jefe</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="departamento">Departamento:</label>
          <select
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
          >
            <option value="No aplica">No aplica</option>
            {departamentos.map((depa) => (
              <option key={depa._id} value={depa._id}>
                {depa.numero} {depa.lugar}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-enviar">
          Agregar Usuario
        </button>
      </form>
    </div>
  );
};

export default NuevoUser;
