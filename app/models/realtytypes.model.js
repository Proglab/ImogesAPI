module.exports = function (sequelize, DataTypes) {
    const Realtytypes = sequelize.define('Realtytypes', {
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

    return Realtytypes;
};