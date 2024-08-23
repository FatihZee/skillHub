"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Service.belongsTo(models.Skill, {
        foreignKey: "skillId",
        as: "skill",
      });

      Service.hasMany(models.Order, {
        foreignKey: "serviceId",
        as: "orders",
      });
    }
  }

  Service.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      skillId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Skills",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      basicPrice: DataTypes.FLOAT,
      standardPrice: DataTypes.FLOAT,
      premiumPrice: DataTypes.FLOAT,
      image: DataTypes.STRING, // Kolom untuk menyimpan nama file gambar
    },
    {
      sequelize,
      modelName: "Service",
    }
  );

  return Service;
};
