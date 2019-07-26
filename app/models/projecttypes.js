'use strict';
module.exports = (sequelize, DataTypes) => {
  const projecttypes = sequelize.define('projecttypes', {
    label:{
      type: DataTypes.STRING(100)
    },
    code:{
      type: DataTypes.STRING(30)
    }
  }, {
    timestamp: true,
    logging: console.log
  });
  projecttypes.associate = function(models) {
    models.projecttypes.hasMany(models.projects);
  };
  return projecttypes;
};