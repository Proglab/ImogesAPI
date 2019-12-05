'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
        'users_realties',
        {
          UsersId: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
          RealtiesId: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_realties');
  }
};
