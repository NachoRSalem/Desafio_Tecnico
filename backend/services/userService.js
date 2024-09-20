const { Usuarios } = require("../database/models");
const bcryptjs = require('bcryptjs');

module.exports = {

    createUser: (data, file) => {
        return Usuarios.create({
            fullName: data.fullName,
            country: data.country,
            telefono: data.telefono,
            email: data.email,
            password: bcryptjs.hashSync(data.password, 10)
            
        });
    },


    getUserByEmail: async (data) => {
        return await Usuarios.findOne({
            where: {
                email: data
            }
        }); 
    }, 

    getAllUsers: () => {
        return Usuarios.findAll({ include: ['roles'] }); 
    },


};
