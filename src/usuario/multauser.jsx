import React from "react";
import Navbar from "./navbar";

const MultaUser = () => {
  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1>🚨 Esta es la página de Multas</h1>
        <p>Aquí podrás ver y administrar las multas registradas.</p>
      </div>
    </div>
  );
};

export default MultaUser;
