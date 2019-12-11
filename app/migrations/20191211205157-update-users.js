'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn(
                    'users',
                    'country_code',
                    {
                        type: Sequelize.STRING(3),
                        defaultValue: 'BE'
                    },
                    {transaction: t}
                ),
                queryInterface.addColumn(
                    'users',
                    'company_name',
                    {
                        type: Sequelize.STRING,
                        allowNull: true
                    },
                    {transaction: t}
                ),
                queryInterface.addColumn(
                    'users',
                    'company_vat',
                    {
                        type: Sequelize.STRING,
                        allowNull: true
                    },
                    {transaction: t}
                ),
                queryInterface.addColumn(
                    'users',
                    'company_address',
                    {
                        type: Sequelize.STRING,
                        allowNull: true
                    },
                    {transaction: t}
                ),
                queryInterface.addColumn(
                    'users',
                    'company_city',
                    {
                        type: Sequelize.STRING,
                        allowNull: true
                    },
                    {transaction: t}
                ),
                queryInterface.addColumn(
                    'users',
                    'company_pc',
                    {
                        type: Sequelize.STRING,
                        allowNull: true
                    },
                    {transaction: t}
                ),
                queryInterface.addColumn(
                    'users',
                    'company_country_code',
                    {
                        type: Sequelize.STRING(3),
                        defaultValue: 'BE'
                    },
                    {transaction: t}
                )
            ]);
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('users', 'country_code', { transaction: t }),
                queryInterface.removeColumn('users', 'company_name', { transaction: t }),
                queryInterface.removeColumn('users', 'company_vat', { transaction: t }),
                queryInterface.removeColumn('users', 'company_address', { transaction: t }),
                queryInterface.removeColumn('users', 'company_city', { transaction: t }),
                queryInterface.removeColumn('users', 'company_pc', { transaction: t }),
                queryInterface.removeColumn('users', 'company_country_code', { transaction: t })
            ]);
        });
    }
};
