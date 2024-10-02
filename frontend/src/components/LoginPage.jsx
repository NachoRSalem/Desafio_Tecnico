import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../assets/css/style.css'; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Mostrar la contraseña
  const togglePassword = () => {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;  
    const password = formData.password;
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Importante para enviar las cookies
      });
     
    
      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del backend:', data); // Verifica datos recibidos

        
        if (data.role) {
          console.log('Rol recibido:', data.role);

          // Redirigir según el tipo de rol
          if (data.role === 'Administrador') {
            navigate('/admin');
          } else {
            navigate('/profile');
          }
        } else {
          console.error('El campo role no está presente en la respuesta.');
        }
      } else {
        const errorData = await response.json();
        setErrors({ server: 'Para Iniciar Sesion ingresar el email y la contraseña con la que te registraste' });
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setErrors({ server: 'Error al enviar los datos' });
    }
  };

  return (
    <main>
      <form className="container-form" onSubmit={handleSubmit}>
        <h2 className="text-center">Iniciar Sesión</h2>

        {/* Email */}
        <div className="form-group my-1">
          <label>Email:</label>
          <input
            id="email"
            type="text"
            name="email"
            className={`form-control ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div className="form-group my-1">
          <label>Contraseña:</label>
          <input
            id="password"
            type="password"
            name="password"
            className={`form-control ${errors.password ? 'error' : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
          <span className="password-toggle" onClick={togglePassword}>Mostrar</span>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {/* Errores */}
        {errors.server && <p className="error-message">{errors.server}</p>}

        <div className="text-center">
          <button type="submit" className="btn-primary">Enviar</button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            Volver
          </button>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
