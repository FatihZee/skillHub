"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "buyerId",
        as: "buyer",
      });
      Order.belongsTo(models.User, {
        foreignKey: "sellerId",
        as: "seller",
      });
      Order.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }

  Order.init(
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serviceId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      priceOption: DataTypes.STRING,
      price: DataTypes.FLOAT,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
