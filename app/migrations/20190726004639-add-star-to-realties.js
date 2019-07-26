'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn( 'realties', 'star', Sequelize.BOOLEAN );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'realties', 'star' );
  }
};
