const userService = require("../services/userService");  

module.exports = async (req, res, next) => {       
    res.locals.isLogged = false;                   

    const emailInCookie = req.cookies.email || '';                                   
    const userFromCookie = await userService.getUserByEmail(emailInCookie);    

    if (userFromCookie) {                         
         req.session.userLogged = userFromCookie;   
    } 
  
    /* if (req.session && req.session.userLogged) { */
    if (req.session?.userLogged) {      
        res.locals.isLogged = true;                      
        res.locals.userLogged = req.session.userLogged;  
    } 
  
    next();
}; 


