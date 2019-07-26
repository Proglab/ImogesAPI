'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('realties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      realty_title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'tooshort_or_toobig'
          }
        }
      },
      realty_facades_number:{
        type: Sequelize.INTEGER
      },
      realty_floor: {
        type: Sequelize.INTEGER
      },
      realty_net_price: {
        type: Sequelize.DECIMAL(8,2),
        defaultValue: 0
      },
      realty_vat: {
        type: Sequelize.FLOAT,
        defaultValue: 21
      },
      realty_short_description: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [3, 255],
            msg: 'tooshort_or_toobig'
          }
        }
      },
      realty_long_description: {
        type: Sequelize.TEXT
      },
      realty_surface: {
        type: Sequelize.FLOAT
      },
      realty_active_online: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      realty_status: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // 0 - libre; 1 - compromis; - 2 acte;
      },
      realty_availability: {
        type: Sequelize.DATE
      },
      realty_start_diffusion_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      realty_kitchen_surface: {
        type: Sequelize.INTEGER
      },
      realty_kitchen_type: {
        type: Sequelize.STRING(2)
      },
      realty_bedrooms: {
        type: Sequelize.STRING(128)
      },
      realty_bathrooms: {
        type: Sequelize.STRING(128)
      },
      realty_showers: {
        type: Sequelize.STRING(128)
      },
      realty_terrace_surface: {
        type: Sequelize.INTEGER
      },
      realty_terrace_orientation: {
        type: Sequelize.STRING(2)
      },
      realty_living_surface: {
        type: Sequelize.INTEGER
      },
      realty_dining_room_surface: {
        type: Sequelize.INTEGER
      },
      realty_attic_surface: {
        type: Sequelize.INTEGER
      },
      realty_office_surface: {
        type: Sequelize.INTEGER
      },
      realty_cellar_surface:{
        type: Sequelize.INTEGER
      },
      realty_freelance_surface: {
        type: Sequelize.INTEGER
      },
      realty_garden_surface: {
        type: Sequelize.INTEGER
      },
      realty_wc_number: {
        type: Sequelize.INTEGER
      },
      realty_acoustic_isolation: {
        type: Sequelize.BOOLEAN
      },
      realty_security_system: {
        type: Sequelize.BOOLEAN
      },
      realty_door_phone: {
        type: Sequelize.BOOLEAN
      },
      realty_videophone: {
        type: Sequelize.BOOLEAN
      },
      realty_security_door: {
        type: Sequelize.BOOLEAN
      },
      realty_laundry: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('realties');
  }
};