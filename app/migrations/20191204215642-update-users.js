'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
          return Promise.all([
              queryInterface.addColumn(
                  'users',
                  'mobile',
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
                  'address',
                  {
                      type: Sequelize.STRING,
                      allowNull: true
                  },
                  {transaction: t}
              ),
              queryInterface.addColumn(
                  'users',
                  'city',
                  {
                      type: Sequelize.STRING,
                      allowNull: true
                  },
                  {transaction: t}
              ),
              queryInterface.addColumn(
                  'users',
                  'pc',
                  {
                      type: Sequelize.STRING(10),
                      allowNull: true
                  },
                  {transaction: t}
              )
          ]);
      });
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('users', 'mobile', { transaction: t }),
              queryInterface.removeColumn('users', 'address', { transaction: t }),
              queryInterface.removeColumn('users', 'city', { transaction: t }),
              queryInterface.removeColumn('users', 'pc', { transaction: t })
          ]);
      });
  }
};
