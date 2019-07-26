'use strict';
module.exports = (sequelize, DataTypes) => {
  const phases = sequelize.define('phases', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    }
  }, {
    timestamp: true,
    logging: console.log
  });
  phases.associate = function(models) {
    models.phases.belongsToMany (models.projects, {through: 'project_phases', foreignKey: 'phase_id'});
  };
  return phases;
};