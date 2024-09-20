import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../assets/css/style.css'; 

const RegistrationPage = () => {
  const navigate = useNavigate(); // Crea una instancia de navigate

  const [formData, setFormData] = useState({
    fullName: '',
    telefono: '',
    email: '',
    password: '',
    country: '',
  });

  const [error, setError] = useState({}); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName) {
      errors.fullName = 'Tienes que escribir un nombre';
    } else if (formData.fullName.length < 5) {
      errors.fullName = 'El nombre debe tener al menos cinco caracteres';
    }

    if (!formData.email) {
      errors.email = 'Ingresar correo electrónico';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingresar un formato de correo electrónico válido';
    }

    if (!/^\d{10}$/.test(formData.telefono)) {
      errors.telefono = 'Por favor, ingresa un número de teléfono válido de 10 dígitos (solo números)';
    }

    if (!formData.password) {
      errors.password = 'Ingresar contraseña';
    } else if (formData.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos una letra mayúscula';
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos una letra minúscula';
    } else if (!/[\d]/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos un número';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos un carácter especial';
    }

    if (!formData.country) {
      errors.country = 'Tienes que elegir un país';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registro exitoso');
        navigate('/login'); // Usa navigate aquí
      } else {
        const errorData = await response.json();
        setError(errorData.errors.reduce((acc, error) => {
          acc[error.param] = error.msg;
          return acc;
        }, {}));
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError({ general: 'Error al enviar los datos' });
    }
  };

  return (
    <main>
      <form className="container-form my-1" onSubmit={handleSubmit}>
        <h2 className="text-center">Formulario de registro</h2>

        {/* Nombre completo */}
        <div className="form-group my-1">
          <label>Nombre completo:</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
          />
          {error.fullName && <p className="error-message">{error.fullName}</p>}
        </div>

        {/* Teléfono */}
        <div className="form-group my-1">
          <label>Número de Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
          />
          {error.telefono && <p className="error-message">{error.telefono}</p>}
        </div>

        {/* Correo electrónico */}
        <div className="form-group my-1">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <p className="error-message">{error.email}</p>}
        </div>

        {/* Contraseña */}
        <div className="form-group my-1">
          <label>Contraseña:</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
          />
          <span 
            className="password-toggle" 
            onClick={togglePassword} 
            aria-label="Mostrar/ocultar contraseña"
          >
            Mostrar
          </span>
          {error.password && <p className="error-message">{error.password}</p>}
        </div>

        {/* País */}
        <div className="form-group my-1">
          <label>País de nacimiento:</label>
          <select
            name="country"
            className="form-select"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Elegí un país</option>
            {['Argentina', 'Bolivia', 'Brasil', 'Colombia', 'Chile', 'Ecuador', 'Paraguay', 'Perú', 'Uruguay', 'Venezuela'].map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {error.country && <p className="error-message">{error.country}</p>}
        </div>

        {error.general && <p className="error-message">{error.general}</p>} 

        <div className="text-center">
          <button type="submit" className="btn-primary">Registrarse</button>
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

export default RegistrationPage;

