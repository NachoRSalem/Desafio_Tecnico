import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Usuarios from './Usuarios'; 
import '../assets/css/style.css';

const AdminPage = () => {
  const navigate = useNavigate(); 

  return (
    <main className="admin-container">
      <h1 className="text-center">Admin</h1>
      <p className="text-center">Bienvenido al panel de administrador.</p>
      <Usuarios />
      <div className="text-center">
  <button
    type="button"
    className="btn-secondary"
    style={{ marginTop: '20px' }} 
    onClick={() => navigate('/')}
  >
    Volver
  </button>
</div>

    </main>
  );
};

export default AdminPage;

