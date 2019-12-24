'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'realties',
            'realty_warranty',
            {
                type: Sequelize.INTEGER,
                defaultValue: 24
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'realties',
            'realty_warranty'
        )
    }
};
