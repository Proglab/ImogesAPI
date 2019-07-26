'use strict';
module.exports = (sequelize, DataTypes) => {
  const realtytypes = sequelize.define('realtytypes', {
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
  realtytypes.associate = function(models) {
    models.realtytypes.hasMany(models.realties);
  };
  return realtytypes;
};