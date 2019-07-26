'use strict';
module.exports = (sequelize, Sequelize) => {
  const roles = sequelize.define('roles', {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    }
  }, {
    timestamp: true,
    logging: console.log
  });
  roles.associate = function(models) {
    models.roles.belongsToMany(models.users, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
  };
  return roles;
};