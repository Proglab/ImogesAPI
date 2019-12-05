'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
// Order belongsTo Customer
    return queryInterface.addColumn(
        'realties', // name of Source model
        'users_id', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove Order belongsTo Customer
    return queryInterface.removeColumn(
      'realties', // name of Source model
      'users_id' // key we want to remove
    );
  }
};
