'use strict';
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'tooshort_or_toobig'
        },
        isEmail: true
      }
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'tooshort_or_toobig'
        },
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    },
    avatar:{
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [2, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    },
    validated:{
      type:Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamp: true,
    logging: console.log
  });
  users.associate = function(models) {
    models.users.belongsToMany(models.roles, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
  };
  return users;
};