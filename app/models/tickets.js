'use strict';
module.exports = (sequelize, Sequelize) => {
    const tickets = sequelize.define('tickets', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        priority:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status:{
            type:Sequelize.INTEGER,
            defaultValue: 0,// 0: en attente, 1: planifié, 2: effectué, 3: fermé, 4: annulé
        },
        planned:{
            type: Sequelize.DATE
        }
    }, {
        timestamp: true,
        logging: console.log,
        scopes: {}
    });
    tickets.associate = function(models) {
        models.tickets.hasOne(models.ticket_messages);
    };
    return tickets;
};
