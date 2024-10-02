import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; 

const PrivateRoute = ({ children, roleRequired }) => {
  const [auth, setAuth] = useState({ authenticated: false, role: null, loading: true });
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/checkauth', {
          method: 'GET',
          credentials: 'include' // para enviar cookies de sesión
        });
        const data = await response.json();
        console.log("Datos de autenticación:", data);
        if (data.authenticated) {
          setAuth({ authenticated: true, role: data.role });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al comprobar la autenticación:", error);
      }
    };
  
    checkAuth();
  }, []);
  

  if (auth.loading) {
    return <div>...</div>; 
  }

  if (!auth.authenticated) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && auth.role !== roleRequired) {
    console.log('Acceso denegado: rol incorrecto');
    navigate('/'); 
  }

  return children;
};

export default PrivateRoute;
