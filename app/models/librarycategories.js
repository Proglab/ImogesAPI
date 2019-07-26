'use strict';
module.exports = (sequelize, DataTypes) => {
  const librarycategories = sequelize.define('librarycategories', {
    library_category_label :{
      type: DataTypes.STRING(100)
    },
    library_category_table_name: {
      type: DataTypes.STRING(30)
    },
    library_category_table_id:{
      type: DataTypes.INTEGER
    },
    library_category_order:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamp: true,
    logging: console.log
  });
  librarycategories.associate = function(models) {
    models.librarycategories.hasMany(models.libraries);
  };
  return librarycategories;
};