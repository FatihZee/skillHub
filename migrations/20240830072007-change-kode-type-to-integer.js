'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Banks', 'kode', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Banks', 'kode', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  }
};
