import React, { useState, useEffect } from 'react';
import '../assets/css/style.css'; 

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/usuarios")
      .then(response => response.json())
      .then(usuarios => {
        setUsuarios(usuarios.data);
      });
  }, []);

  return (
    <div className="table">
      <div className="header">
        <div>ID</div>
        <div>Nombre</div>
        <div>Email</div>
        <div>Telefono</div>
        <div>Pais</div>
        <div>Rol</div>
      </div>
      <div className="body">
        {usuarios.map(usuario => (
          <React.Fragment key={usuario.id}>
            <div>{usuario.id}</div>
            <div>{usuario.fullName}</div>
            <div>{usuario.email}</div>
            <div>{usuario.telefono}</div>
            <div>{usuario.country}</div>
            <div>{usuario.rol_tipo}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Usuarios;
