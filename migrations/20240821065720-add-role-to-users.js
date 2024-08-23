// migrations/XXXXXX-add-role-to-users.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false, // Agar kolom ini tidak boleh null
      defaultValue: 'member', // Menetapkan nilai default sebagai 'member'
      after: 'phone' // Tempatkan kolom setelah kolom phone
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
  }
};
