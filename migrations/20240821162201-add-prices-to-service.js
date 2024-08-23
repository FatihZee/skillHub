"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Services', 'basicPrice', {
      type: Sequelize.FLOAT,
      allowNull: true,
      after: 'isAvailable'
    });
    await queryInterface.addColumn('Services', 'standardPrice', {
      type: Sequelize.FLOAT,
      allowNull: true,
      after: 'basicPrice'
    });
    await queryInterface.addColumn('Services', 'premiumPrice', {
      type: Sequelize.FLOAT,
      allowNull: true,
      after: 'standardPrice'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Services', 'basicPrice');
    await queryInterface.removeColumn('Services', 'standardPrice');
    await queryInterface.removeColumn('Services', 'premiumPrice');
  }
};
