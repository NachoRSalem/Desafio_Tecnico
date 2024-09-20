module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Usuarios",
        {
            fullName: DataTypes.STRING,
            country: DataTypes.STRING,
            telefono: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            rol_tipo: {
                type: DataTypes.STRING,
                defaultValue: 'Usuario'
            }
        },
        {
            tableName: "usuarios",
            timestamps: false,    
        }
    );
    
    Model.associate = (models) => {
        Model.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'rol_tipo',
        });
    };

    return Model;
} 