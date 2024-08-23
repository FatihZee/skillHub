'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Services', 'image', {
      type: Sequelize.STRING,
      allowNull: true, // Kolom ini opsional, jadi bisa null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Services', 'image');
  }
};
