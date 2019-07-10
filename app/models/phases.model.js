module.exports = function (sequelize, DataTypes) {
    const Phases = sequelize.define('Phases', {
            title: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'tooshort_or_toobig'
                    }
                }
            },
        },
        {
            timestamp: true,
            logging: console.log
        });
    return Phases;
};