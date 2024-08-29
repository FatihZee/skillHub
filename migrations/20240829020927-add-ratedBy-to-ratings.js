'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Ratings', 'ratedBy', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nama tabel yang menjadi referensi
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Ratings', 'ratedBy');
  }
};
