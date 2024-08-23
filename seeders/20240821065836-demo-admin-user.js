// seeders/XXXXXX-demo-admin-user.js
'use strict';

const { hashPassword } = require('../helpers/bcrypt');
require('dotenv').config(); // Memuat variabel lingkungan dari file .env

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ambil password admin dari variabel lingkungan
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Hash password untuk keamanan
    const hashedPassword = await hashPassword(adminPassword);

    await queryInterface.bulkInsert('Users', [{
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      phone: '08123456789',
      role: 'admin', // Set role sebagai admin
      profileImage: null,
      coverImage: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data admin dari tabel Users jika perlu rollback
    await queryInterface.bulkDelete('Users', {
      email: 'admin@example.com'
    }, {});
  }
};
