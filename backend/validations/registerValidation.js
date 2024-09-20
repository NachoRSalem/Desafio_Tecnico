const { body } = require("express-validator");
const userService = require("../services/userService");
const path = require("path");

const validationsRegister = [
    
    body('fullName')
		.notEmpty()
		.withMessage('Tienes que escribir un nombre')
		.isLength({ min: 5 })
        .withMessage("El nombre debe tener al menos cinco caracteres"),

	 body('email')
		.notEmpty()
		.withMessage("Ingresar correo eléctrónico")
		.isEmail()
		.withMessage("Inngresar un formato de correo electronico válido")
		.bail()
		.custom(async (value, { req }) => {
			let email = req.body.email;
			let emailToLower = email.toLowerCase();
			let checkEmail = await userService.getUserByEmail(emailToLower);
			if (!checkEmail) {
				return true;
			} else {
				throw new Error(`El correo electrónico ${email} ya está registrado.`);
			}
		}),

	body('telefono')
		.matches(/^\d{10}$/)
		.withMessage('Por favor, ingresa un número de teléfono válido de 10 dígitos (solo números)'),

	body('password')
		.notEmpty()
		.withMessage("Ingresar contraseña")
		.bail()
		.isLength({ min: 8 })
		.withMessage("La contraseña debe tener al menos 8 caracteres")
		.bail()
		.matches(/[A-Z]/)
		.withMessage("La contraseña debe contener al menos una letra mayúscula")
		.bail()
		.matches(/[a-z]/)
		.withMessage("La contraseña debe contener al menos una letra minúscula")
		.bail()
		.matches(/[\d]/)
		.withMessage("La contraseña debe contener al menos un número")
		.bail()
		.matches(/[!@#$%^&*(),.?":{}|<>]/)
		.withMessage("La contraseña debe contener al menos un carácter especial"),

	body('country')
		.notEmpty()
		.withMessage('Tienes que elegir un país'),
 
]; 


module.exports = validationsRegister;