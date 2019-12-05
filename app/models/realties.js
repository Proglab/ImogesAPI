'use strict';
module.exports = (sequelize, DataTypes) => {
  const realties = sequelize.define('realties', {
    realty_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    },
    realty_facades_number:{
      type: DataTypes.INTEGER
    },
    realty_floor: {
      type: DataTypes.INTEGER
    },
    realty_net_price: {
      type: DataTypes.DECIMAL(8,2),
      defaultValue: 0
    },
    realty_vat: {
      type: DataTypes.FLOAT,
      defaultValue: 21
    },
    realty_short_description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    },
    realty_long_description: {
      type: DataTypes.TEXT
    },
    realty_surface: {
      type: DataTypes.FLOAT
    },
    realty_active_online: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    realty_status: {
      type: DataTypes.INTEGER,
      defaultValue: 0 // 0 - libre; 1 - compromis; - 2 acte;
    },
    realty_availability: {
      type: DataTypes.DATE
    },
    realty_start_diffusion_date:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    realty_kitchen_surface: {
      type: DataTypes.INTEGER
    },
    realty_kitchen_type: {
      type: DataTypes.STRING(2)
    },
    realty_bedrooms: {
      type: DataTypes.STRING(128)
    },
    realty_bathrooms: {
      type: DataTypes.STRING(128)
    },
    realty_showers: {
      type: DataTypes.STRING(128)
    },
    realty_terrace_surface: {
      type: DataTypes.INTEGER
    },
    realty_terrace_orientation: {
      type: DataTypes.STRING(2)
    },
    realty_living_surface: {
      type: DataTypes.INTEGER
    },
    realty_dining_room_surface: {
      type: DataTypes.INTEGER
    },
    realty_attic_surface: {
      type: DataTypes.INTEGER
    },
    realty_office_surface: {
      type: DataTypes.INTEGER
    },
    realty_cellar_surface:{
      type: DataTypes.INTEGER
    },
    realty_freelance_surface: {
      type: DataTypes.INTEGER
    },
    realty_garden_surface: {
      type: DataTypes.INTEGER
    },
    realty_wc_number: {
      type: DataTypes.INTEGER
    },
    realty_acoustic_isolation: {
      type: DataTypes.BOOLEAN
    },
    realty_security_system: {
      type: DataTypes.BOOLEAN
    },
    realty_door_phone: {
      type: DataTypes.BOOLEAN
    },
    realty_videophone: {
      type: DataTypes.BOOLEAN
    },
    realty_security_door: {
      type: DataTypes.BOOLEAN
    },
    realty_laundry: {
      type: DataTypes.BOOLEAN
    },
    star:{
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamp: true,
    logging: console.log,
    scopes: {
      limit (offset, limit) {
        return {
          offset: offset,
          limit: limit
        }
      },
      order (field, order) {
        return {
          order: [[field, order]]
        }
      },
      withMedia: {
        include: {
          model: sequelize.models.librarycategories,
          required: false
        }
      },
      active:{
        where: {
          realty_active_online: true
        }
      },
      status (status) {
        return {
          where: {
            realty_status: status
          }
        }
      },
      star (limit){
        return {
          order: [['star', 'DESC']],
          offset: 0,
          limit: limit
        }
      },
      byProject (id) {
        return {
          where: {
            projectId: id
          }
        }
      },
      withProject: {
          include: ["project"]
      }
    }
  });
  realties.associate = function(models) {
    models.realties.belongsTo(models.projects);
    models.realties.belongsTo(models.users);
    models.realties.belongsTo(models.realtytypes);
    models.realties.belongsTo(models.realtycontracttypes);
    models.realties.hasMany(models.librarycategories, {
      foreignKey: 'library_category_table_id',
      foreignKeyConstraint: false,
      scope: {
        library_category_table_name: 'Realties'
      }
    });
  };
  return realties;
};