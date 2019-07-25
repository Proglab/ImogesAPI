module.exports = function (sequelize, DataTypes) {
    const Realtycontracttypes = sequelize.define('Realtycontracttypes', {
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

    return Realtycontracttypes;
};