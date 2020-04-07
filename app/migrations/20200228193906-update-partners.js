'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'partners', // name of Source model
            'supportcategoryId', // name of the key we're adding
            {
                type: Sequelize.UUID,
                references: {
                    model: 'supportcategories', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'partners', // name of Source model
            'supportcategoryId' // key we want to remove
        );
    }
};