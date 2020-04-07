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
        },
        active:{
            type: Sequelize.INTEGER,
            defaultValue: 0
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
        models.partners.belongsTo(models.supportcategories);
    };
    return partners
};