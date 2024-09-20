import React from 'react';
import Usuarios from './Usuarios'; 
import '../assets/css/style.css';

const AdminPage = () => {
  return (
    <main className="admin-container">
      <h1 className="text-center">Admin</h1>
      <p className="text-center">Bienvenido al panel de administrador.</p>
      <Usuarios /> 
    </main>
  );
};

export default AdminPage;
