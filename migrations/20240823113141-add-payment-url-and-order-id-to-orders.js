"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "paymentUrl", {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'status'
    });
    await queryInterface.addColumn("Orders", "orderId", {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "paymentUrl");
    await queryInterface.removeColumn("Orders", "orderId");
  },
};
