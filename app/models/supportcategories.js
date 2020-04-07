'use strict';
module.exports = (sequelize, Sequelize) => {
    const supportcategories = sequelize.define('supportcategories', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        timestamp: true,
        logging: console.log,
        scopes: {

        }
    });
    supportcategories.associate = function(models) {
        models.supportcategories.hasMany(models.partners);
        models.supportcategories.hasMany(models.faqs);
        models.supportcategories.hasMany(models.librarycategories, {
            foreignKey: 'library_category_table_id',
            foreignKeyConstraint: false,
            scope: {
                library_category_table_name: 'supportcategories'
            }
        });
    };
    return supportcategories;
};
