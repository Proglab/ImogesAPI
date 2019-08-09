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
    logging: console.log,
    defaultScope: {
      include: [
        { model: sequelize.models.libraries }
      ]
    },
    scopes: {
      order(field, order) {
        return {
          order: [[field, order]]
        }
      },
      projects(id) {
        return {
          where: {
            library_category_table_name: 'Projects',
            library_category_table_id: id
          }
        }
      },
      realties(id) {
        return {
          where: {
            library_category_table_name: 'Realties',
            library_category_table_id: id
          }
        }
      },
      withMediaByExtension(value) {
        return {
          include: [{ model: sequelize.models.libraries, where: { library_media_extension: value }}]
        }
      },
      withMediaByParam(value) {
        return {
          include: [{ model: sequelize.models.libraries, where: { library_media_param: value }}]
        }
      },
      withMediaByUser(value) {
        return {
          include: [{ model: sequelize.models.libraries, where: { UserId: value }}]
        }
      },
      ByLabel(value) {
        return {
          where: {
            library_category_label: value
          }
        }
      },
      withMedia: {
        include: [
          { model: sequelize.models.libraries }
        ]
      }
    }
  });
  librarycategories.associate = function(models) {
    models.librarycategories.hasMany(models.libraries);
  };
  return librarycategories;
};