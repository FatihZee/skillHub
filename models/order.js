"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Relasi dengan User sebagai pembeli
      Order.belongsTo(models.User, {
        foreignKey: "buyerId",
        as: "buyer",
      });

      // Relasi dengan User sebagai penjual
      Order.belongsTo(models.User, {
        foreignKey: "sellerId",
        as: "seller",
      });

      // Relasi dengan Service
      Order.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }

  Order.init(
    {
      orderId: DataTypes.STRING, // ID unik untuk order
      serviceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Services",
          key: "id",
        },
      },
      buyerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      priceOption: DataTypes.STRING, // Pilihan harga seperti 'basic', 'standard', 'premium'
      price: DataTypes.FLOAT, // Harga total berdasarkan pilihan harga
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending", // Status pembayaran default
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
