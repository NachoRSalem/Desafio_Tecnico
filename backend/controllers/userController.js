
const userService = require("../services/userService");
const bcryptjs = require('bcryptjs');

const userController = { 

 
    register: (req, res) => {
        res.send({ message: "Renderizar la página de registro" });
    },


    registerProcess: async (req, res) => {
        try {
            await userService.createUser(req.body, req.file);
            res.status(201).json({ message: "Usuario creado con éxito" });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el usuario" });
        }
    },

    
    login: (req, res) => {
        res.send({ message: "Renderizar la página de login" });
    },

   
    loginProcess: async (req, res) => {
        try {
            const userToLogin = await userService.getUserByEmail(req.body.email);
        
            if (userToLogin) {
                // Comparar la contraseña con la almacenada en la base de datos
                const validPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        
                if (validPassword) {
                    // Eliminar la contraseña por seguridad antes de guardarlo en la sesión
                    delete userToLogin.password;
                    
                    // Guardar al usuario autenticado en la sesión
                    req.session.userLogged = userToLogin;
    
                    // Si el usuario selecciona 'rememberMe', establecer una cookie
                    if (req.body.rememberMe) {
                        res.cookie('email', req.body.email, { 
                            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
                            httpOnly: true // Aumenta la seguridad al hacer la cookie accesible solo por el servidor
                        });
                    }
    
                    // Respuesta exitosa, indicar a qué ruta debe redirigir
                    return res.status(200).json({ 
                        message: userToLogin.rol_tipo === 'Administrador' ? 'Redirigir a /admin' : 'Redirigir a /profile',
                        role: userToLogin.rol_tipo 
                    });
                } else {
                    // Contraseña incorrecta
                    return res.status(401).json({ error: "Usuario y/o contraseña inválidos" });
                }
            } else {
                // Usuario no encontrado
                return res.status(404).json({ error: "Correo electrónico no encontrado" });
            }
        } catch (error) {
            // Error inesperado del servidor
            console.error('Error en login:', error);
            return res.status(500).json({ error: "Error al procesar el login" });
        }
    },
    

    profile: (req, res) => {
        res.json({ user: req.session.userLogged });
    },

    admin: (req, res) => {
        res.json({ user: req.session.userLogged }); 
    },
    checkAuth: (req, res) => {
        if (req.session && req.session.userLogged) { // Verifica si hay una sesión activa
          res.json({
            authenticated: true,
            role: req.session.userLogged.rol_tipo // Devuelve el rol del usuario
          });
        } else {
          res.status(401).json({
            authenticated: false,
            error: 'No estás autenticado.' // Responde con 401 si no hay sesión
          });
        }
      }
      
      
    
};

   


module.exports = userController;



 /* Endpoint para cerrar sesión
    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        res.json({ message: 'Sesión cerrada' });
    },*/