"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'price', {
      type: Sequelize.FLOAT,
      allowNull: true, // Sesuaikan dengan kebutuhan Anda
      after: 'priceOption'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'price');
  }
};
