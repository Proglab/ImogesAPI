'use strict';
module.exports = (sequelize, DataTypes) => {
  const realtycontracttypes = sequelize.define('realtycontracttypes', {
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
  realtycontracttypes.associate = function(models) {
    models.realtycontracttypes.hasMany(models.realties);
  };
  return realtycontracttypes;
};