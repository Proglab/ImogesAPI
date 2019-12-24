'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'realties',
          'realty_reception_date',
          {
              type: Sequelize.DATE
          }
      )
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
          'realties',
          'realty_reception_date'
      )
  }
};
