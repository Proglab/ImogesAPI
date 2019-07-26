'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_title: {
        type: Sequelize.STRING,
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
        type: Sequelize.TEXT
      },
      project_facade_number: {
        type: Sequelize.INTEGER
      },
      project_cadastral_income: {
        type: Sequelize.DECIMAL(5,2)
      },
      project_charges: {
        type: Sequelize.DECIMAL(5,2)
      },
      project_creation_date: {
        type: Sequelize.DATE
      },
      project_start_build_date: {
        type: Sequelize.DATE
      },
      project_end_build_date: {
        type: Sequelize.DATE
      },
      project_start_diffusion_date: {
        type: Sequelize.DATE
      },
      project_short_description: {
        type: Sequelize.TEXT
      },
      project_long_description: {
        type: Sequelize.TEXT
      },
      project_address: {
        type: Sequelize.TEXT
      },
      project_city: {
        type: Sequelize.TEXT
      },
      project_pc: {
        type: Sequelize.TEXT
      },
      project_state: {
        type: Sequelize.TEXT
      },
      project_country: {
        type: Sequelize.STRING(2)
      },
      project_active_online: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      project_actual_phase: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      project_lat: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      project_long: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      project_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      project_environment_type: {
        type: Sequelize.STRING(2)
      },
      project_terrain_size: {
        type: Sequelize.INTEGER
      },
      project_parking_in_number: {
        type: Sequelize.INTEGER
      },
      project_parking_out_number: {
        type: Sequelize.INTEGER
      },
      project_floor_number: {
        type: Sequelize.INTEGER
      },
      project_handicapped_access: {
        type: Sequelize.BOOLEAN
      },
      project_lift: {
        type: Sequelize.BOOLEAN
      },
      project_concierge: {
        type: Sequelize.BOOLEAN
      },
      project_peb: {
        type: Sequelize.INTEGER
      },
      project_heating_type: {
        type: Sequelize.STRING(1)
      },
      project_energy_consumption: {
        type: Sequelize.DECIMAL(4,2)
      },
      project_CO2_emission: {
        type: Sequelize.DECIMAL(4,2)
      },
      project_air_conditioning: {
        type: Sequelize.BOOLEAN
      },
      project_heat_pump: {
        type: Sequelize.BOOLEAN
      },
      project_double_glazing: {
        type: Sequelize.BOOLEAN
      },
      project_PV: {
        type: Sequelize.BOOLEAN
      },
      project_distance_schools: {
        type: Sequelize.INTEGER
      },
      project_distance_shops: {
        type: Sequelize.INTEGER
      },
      project_distance_transports: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
};