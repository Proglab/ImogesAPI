'use strict';
module.exports = (sequelize, Sequelize) => {
    const ticketmessages = sequelize.define('ticketmessages', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        message:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        timestamp: true,
        logging: console.log,
        scopes: {}
    });
    ticketmessages.associate = function(models) {
        models.ticketmessages.belongsTo(models.tickets);
        models.ticketmessages.belongsTo(models.users);
        models.ticketmessages.hasMany(models.librarycategories, {
            foreignKey: 'library_category_table_id',
            foreignKeyConstraint: false,
            scope: {
                library_category_table_name: 'Ticketmessages'
            }
        });
    };
    return ticketmessages;
};
