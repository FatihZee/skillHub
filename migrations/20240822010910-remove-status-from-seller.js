"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'statusFromSeller'); // Menghapus kolom statusFromSeller
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'statusFromSeller', {
      type: Sequelize.STRING,
      defaultValue: "pending",
    });
  }
};
