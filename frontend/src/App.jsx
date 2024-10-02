import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import UserPage from './components/UserPage'; 
import AdminPage from './components/AdminPage'; 
import PrivateRoute from './components/PrivateRoute'; 
import './assets/css/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        
        {/* Ruta protegida para el perfil de usuario */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          } 
        />

        {/* Ruta protegida para el administrador */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute roleRequired="Administrador">
              <AdminPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;

