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
      unique: true,
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
      unique: true,
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
    },
    mobile: {
      type:Sequelize.STRING(16),
      allowNull: true,
      validate:{
        len:{
          args: [9, 20],
          msg: 'tooshort_or_toobig'
        }
      }
    },
      mobile2: {
          type:Sequelize.STRING(16),
          allowNull: true,
          validate:{
              len:{
                  args: [9, 20],
                  msg: 'tooshort_or_toobig'
              }
          }
      },
      phone: {
          type:Sequelize.STRING(16),
          allowNull: true,
          validate:{
              len:{
                  args: [9, 20],
                  msg: 'tooshort_or_toobig'
              }
          }
      },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pc:{
      type: Sequelize.STRING(10),
      allowNull: true
    },
    country_code:{
        type: Sequelize.STRING(3),
        defaultValue: 'BE'
    },
    company_name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    company_vat:{
        type: Sequelize.STRING,
        allowNull: true
    },
    company_address:{
        type: Sequelize.STRING,
        allowNull: true
    },
    company_city:{
        type: Sequelize.STRING,
        allowNull: true
    },
    company_pc:{
        type: Sequelize.STRING,
        allowNull: true
    },
    company_country_code:{
        type: Sequelize.STRING(3),
        defaultValue: 'BE'
    }
  }, {
      timestamp: true,
      logging: console.log,
      scopes: {
          withRealties:{
              include: [{
                  model: sequelize.models.realties,
                  required : true,
                  include:[
                      {
                          model: sequelize.models.projects,
                          required: true,
                          include:[
                              {
                                  model: sequelize.models.partners
                              }
                          ]
                      }
                  ]
                }
              ]
          }
      }
  });
  users.associate = function(models) {
    models.users.hasMany(models.ticketmessages);
    models.users.belongsToMany(models.roles, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
    models.users.belongsToMany(models.realties, { through: 'users_realties' } );
    models.users.hasOne(models.partners);
    models.users.hasOne(models.tickets);
  };
  return users;
};