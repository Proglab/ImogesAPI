'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn(
                    'users',
                    'mobile2',
                    {
                        type: Sequelize.STRING(20),
                        allowNull: true,
                        validate:{
                            len:{
                                args: [9, 20],
                                msg: 'tooshort_or_toobig'
                            }
                        }
                    },
                    {transaction: t}
                ),
                queryInterface.addColumn(
                    'users',
                    'phone',
                    {
                        type: Sequelize.STRING(20),
                        allowNull: true,
                        validate:{
                            len:{
                                args: [9, 20],
                                msg: 'tooshort_or_toobig'
                            }
                        }
                    },
                    {transaction: t}
                ),
            ]);
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('users', 'mobile2', { transaction: t }),
                queryInterface.removeColumn('users', 'phone', { transaction: t })
            ]);
        });
    }
};
