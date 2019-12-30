'use strict';
module.exports = (sequelize, Sequelize) => {
    const tickets = sequelize.define('tickets', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        priority:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status:{
            type:Sequelize.INTEGER,
            defaultValue: 0// 0: en attente, 1: planifié, 2: effectué, 3: fermé, 4: annulé
        },
        planned:{
            type: Sequelize.DATE
        }
    }, {
        timestamp: true,
        logging: console.log,
        scopes: {
            withAll: {
                include: [
                    {
                        model: sequelize.models.realties,
                        required : true,
                        include:[
                            {
                                model: sequelize.models.projects,
                                required: true
                            }
                        ]
                    }
                ]
            }
        }
    });
    tickets.associate = function(models) {
        models.tickets.belongsTo(models.realties);
        models.tickets.belongsTo(models.partners);
        models.tickets.belongsTo(models.users);
        models.tickets.hasMany(models.ticketmessages);
    };
    return tickets;
};
