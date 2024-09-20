module.exports = (req, res, next) => {
    if (req.session && req.session.userLogged) {
        console.log('Usuario autenticado:', req.session.userLogged); 
        return next(); // Si el usuario está autenticado, continúa
    }
    // Si no está autenticado, devuelve un mensaje claro
    return res.status(401).json({
        message: 'No estás autenticado. Por favor, inicia sesión.',
        redirect: '/login' // Redirección opcional
    });
};

