'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('libraryvategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      library_category_label :{
        type: Sequelize.STRING(100)
      },
      library_category_table_name: {
        type: Sequelize.STRING(30)
      },
      library_category_table_id:{
        type: Sequelize.INTEGER
      },
      library_category_order:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('libraryvategories');
  }
};