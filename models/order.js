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
      orderId: DataTypes.STRING,    // ID pesanan dari Midtrans
      serviceId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      priceOption: DataTypes.STRING, // basicPrice, standardPrice, premiumPrice
      price: DataTypes.FLOAT,        // Harga yang dipilih
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending", // Status pembayaran
      },
      paymentUrl: DataTypes.STRING, // URL pembayaran dari Midtrans
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
