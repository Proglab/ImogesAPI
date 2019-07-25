module.exports = function (sequelize, DataTypes) {
    const Projecttypes = sequelize.define('Projecttypes', {
            label:{
                type: DataTypes.STRING(100)
            },
            code:{
                type: DataTypes.STRING(30)
            }
        },
        {
            timestamp: true,
            logging: console.log
        });

    return Projecttypes;
};