'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('partners', {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
          },
          title:{
              type: Sequelize.STRING(),
              allowNull: false
          },
          description:{
              type: Sequelize.TEXT
          }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('partners');
  }
};
