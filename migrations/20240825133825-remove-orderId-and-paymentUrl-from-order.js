"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "orderId");
    await queryInterface.removeColumn("Orders", "paymentUrl");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "orderId", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Orders", "paymentUrl", {
      type: Sequelize.STRING,
    });
  },
};
