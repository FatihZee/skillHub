module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Prices');
  },
  down: async (queryInterface, Sequelize) => {
    // In case of rollback, you might want to recreate the Prices table
    await queryInterface.createTable('Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      basicPrice: {
        type: Sequelize.FLOAT,
      },
      standardPrice: {
        type: Sequelize.FLOAT,
      },
      premiumPrice: {
        type: Sequelize.FLOAT,
      },
      serviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Services',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
};
