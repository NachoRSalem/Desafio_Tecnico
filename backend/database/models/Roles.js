module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Roles",
        {
            tipo: {
                type: DataTypes.STRING,
                primaryKey: true
              }   
        },
        {
            tableName: "roles",
            timeStamps: false,    
        }
    );

    Model.associate = (models) => {
        Model.hasMany(models.Usuarios, {
            as: 'usuarios',
            foreignKey: 'rol_tipo',
        });
    };

    return Model;
}