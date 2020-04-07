'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, Sequelize) => {
    const faqs = sequelize.define('faqs', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING(150),
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
            search(terms){
                return {
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: '%' + terms + '%'
                                }
                            },{
                                description:{
                                    [Op.like]: '%' + terms + '%'
                                }
                            }
                        ]
                    }
                }
            }
        }
    });
    faqs.associate = function(models) {
        models.faqs.belongsTo(models.supportcategories);
        models.faqs.hasMany(models.librarycategories, {
            foreignKey: 'library_category_table_id',
            foreignKeyConstraint: false,
            scope: {
                library_category_table_name: 'faqs'
            }
        });
    };
    return faqs;
};
