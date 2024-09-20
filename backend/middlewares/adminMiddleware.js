
module.exports = (req, res, next) => {
    if (req.session && req.session.userLogged){
        if (req.session.userLogged.rol_tipo == "Administrador") {
            next();
        } else {
            res.redirect('/login');
        }
    }else{
        res.redirect('/login');
    } 
};