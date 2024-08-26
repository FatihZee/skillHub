"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "orderId", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "id", // ensures the new column is added after the 'id' column
    });

    // Optionally, if you want to populate the orderId for existing records
    await queryInterface.sequelize.query(
      "UPDATE Orders SET orderId = CONCAT('order-', id, '-', UNIX_TIMESTAMP())"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "orderId");
  },
};
