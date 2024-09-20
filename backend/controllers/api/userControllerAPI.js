const userService = require("../../services/userService");

const productsControllerAPI = {
    list: (req, res) => {
        userService.getAllUsers()
        .then(usuarios => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: usuarios.length,
                    url: "/api/usuarios",
                },
                data: usuarios,
            };
            res.json(respuesta);
        })
    },

};

module.exports = productsControllerAPI;