const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const resultValidation = validationResult(req);

    if (!resultValidation.isEmpty()) {
        // Enviar los errores en formato JSON
        return res.status(400).json({
            errors: resultValidation.mapped(),
            oldData: req.body,
            email: req.session?.userLogged?.email,
        });
    }
    
    next();
};
