import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css'; 

function HomePage() {
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <div className="button-container">
        <button className="nav-button" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="nav-button" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
}

export default HomePage;

