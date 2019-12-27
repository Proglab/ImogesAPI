'use strict';
module.exports = (sequelize, Sequelize) => {
    const partners = sequelize.define('partners', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT
        }
    }, {
        timestamp: true,
        logging: console.log,
        scopes:{}
    });
    partners.associate = function(models) {
        models.partners.belongsToMany(models.projects, { through: 'project_partners' } );
        models.partners.hasOne(models.tickets);
        models.partners.belongsTo(models.users);
    };
    return partners
};