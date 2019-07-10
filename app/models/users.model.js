module.exports = function (sequelize, Sequelize) {
    const Users = sequelize.define('Users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'tooshort_or_toobig'
                    }
                }
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'tooshort_or_toobig'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'tooshort_or_toobig'
                    },
                    isEmail: true
                }
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'tooshort_or_toobig'
                    },
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'tooshort_or_toobig'
                    }
                }
            },
            avatar:{
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'tooshort_or_toobig'
                    }
                }
            }
        },
        {
            timestamp: true,
            logging: console.log,
            classMethods: {
                associate: function(models) {

                }
            }
        });
    return Users;
};