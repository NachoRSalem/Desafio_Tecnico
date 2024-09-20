const { Router } = require("express");
const router = Router();

const userController = require("../controllers/userController");

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const loginValidations = require('../validations/loginValidations');
const registerValidations = require('../validations/registerValidation');
const loginFormMiddleware = require('../middlewares/loginFormMiddleware');
const registerFormMiddleware = require('../middlewares/registerFormMiddleware');


// Rutas de autenticación
router.post("/login", loginValidations, loginFormMiddleware, userController.loginProcess); 
router.post("/register", registerValidations, registerFormMiddleware, userController.registerProcess); 

// Rutas protegida
router.get("/profile", authMiddleware, userController.profile);
router.get("/admin", authMiddleware, userController.admin);


router.get('/checkauth', userController.checkAuth);

module.exports = router;
