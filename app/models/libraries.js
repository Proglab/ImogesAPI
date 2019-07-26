'use strict';
module.exports = (sequelize, DataTypes) => {
  const libraries = sequelize.define('libraries', {
    library_media_name:{
      type: DataTypes.STRING(100)
    },
    library_media_type:{
      type: DataTypes.STRING(30)
    },
    library_media_extension: {
      type: DataTypes.STRING(5)
    },
    library_media_param:{
      type: DataTypes.STRING(100)
    },
    library_media_order: {
      type: DataTypes.INTEGER
    },
    library_media_size: {
      type: DataTypes.FLOAT
    },
    library_media_resource: {
      type: DataTypes.STRING(15)
    },
    library_media_url: {
      type: DataTypes.STRING(150)
    },
    library_media_hash: {
      type: DataTypes.STRING(12)
    }
  }, {
    timestamp: true,
    logging: console.log
  });
  libraries.associate = function(models) {
    models.libraries.belongsTo(models.librarycategories);
    models.libraries.belongsTo(models.users);
  };
  return libraries;
};