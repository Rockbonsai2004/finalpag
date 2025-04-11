import React from "react";
import Navbar from "./navbar";

const PermisoUser = () => {
  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1>📜 Esta es la página de Permisos</h1>
        <p>Aquí podrás gestionar las solicitudes de permisos.</p>
      </div>
    </div>
  );
};

export default PermisoUser;
