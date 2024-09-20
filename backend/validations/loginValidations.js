const { body } = require("express-validator");
module.exports = [
  body('email')
      .notEmpty()
      .withMessage("Ingresar correo eléctrónico")
      .isEmail()
      .withMessage("Inngresar un formato de correo electronico válido")
      .trim()
      .escape(),
  body('password')
      .notEmpty()
      .withMessage("Ingresar contraseña")
      .bail()
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres")
];
 