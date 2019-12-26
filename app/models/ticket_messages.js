'use strict';
module.exports = (sequelize, Sequelize) => {
    const ticket_messages = sequelize.define('ticket_messages', {
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
    ticket_messages.associate = function(models) {

    };
    return ticket_messages;
};
