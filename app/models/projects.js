'use strict';

const Op = require('sequelize').Op;

module.exports = (sequelize, DataTypes) => {
  const projects = sequelize.define('projects', {
    project_title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: 'tooshort_or_toobig'
        }
      }
    },
    project_ref:{
      type: DataTypes.TEXT
    },
    project_facade_number: {
      type: DataTypes.INTEGER
    },
    project_cadastral_income: {
      type: DataTypes.DECIMAL(5,2)
    },
    project_charges: {
      type: DataTypes.DECIMAL(5,2)
    },
    project_creation_date: {
      type: DataTypes.DATE
    },
    project_start_build_date: {
      type: DataTypes.DATE
    },
    project_end_build_date: {
      type: DataTypes.DATE
    },
    project_start_diffusion_date: {
      type: DataTypes.DATE
    },
    project_short_description: {
      type: DataTypes.TEXT
    },
    project_long_description: {
      type: DataTypes.TEXT
    },
    project_address: {
      type: DataTypes.TEXT
    },
    project_city: {
      type: DataTypes.TEXT
    },
    project_pc: {
      type: DataTypes.TEXT
    },
    project_state: {
      type: DataTypes.TEXT
    },
    project_country: {
      type: DataTypes.STRING(2)
    },
    project_active_online: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    project_actual_phase: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    project_lat: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    project_long: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    project_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    project_environment_type: {
      type: DataTypes.STRING(2)
    },
    project_terrain_size: {
      type: DataTypes.INTEGER
    },
    project_parking_in_number: {
      type: DataTypes.INTEGER
    },
    project_parking_out_number: {
      type: DataTypes.INTEGER
    },
    project_floor_number: {
      type: DataTypes.INTEGER
    },
    project_handicapped_access: {
      type: DataTypes.BOOLEAN
    },
    project_lift: {
      type: DataTypes.BOOLEAN
    },
    project_concierge: {
      type: DataTypes.BOOLEAN
    },
    project_peb: {
      type: DataTypes.INTEGER
    },
    project_heating_type: {
      type: DataTypes.STRING(1)
    },
    project_energy_consumption: {
      type: DataTypes.DECIMAL(4,2)
    },
    project_CO2_emission: {
      type: DataTypes.DECIMAL(4,2)
    },
    project_air_conditioning: {
      type: DataTypes.BOOLEAN
    },
    project_heat_pump: {
      type: DataTypes.BOOLEAN
    },
    project_double_glazing: {
      type: DataTypes.BOOLEAN
    },
    project_PV: {
      type: DataTypes.BOOLEAN
    },
    project_distance_schools: {
      type: DataTypes.INTEGER
    },
    project_distance_shops: {
      type: DataTypes.INTEGER
    },
    project_distance_transports: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamp: true,
    logging: console.log,
    defaultScope: {
      where: {
        project_start_diffusion_date: {
          [Op.lt]: Date.now()
        }
      }
    },
    scopes: {
      active:{
        where: {
          project_active_online: true
        }
      },
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
      }
    }
  });
  projects.associate = function(models) {
    models.projects.belongsToMany(models.phases, {through: 'project_phases', foreignKey: 'project_id'});
    models.projects.hasMany(models.realties);
    models.projects.belongsTo(models.projecttypes);
    models.projects.hasMany(models.librarycategories, {
      foreignKey: 'library_category_table_id',
      foreignKeyConstraint: false,
      scope: {
        library_category_table_name: 'Projects'
      }
    });
  };
  return projects;
};