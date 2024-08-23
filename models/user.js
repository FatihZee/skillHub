"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define association here
      User.hasMany(models.Portfolio, {
        foreignKey: "userId",
        as: "portfolios",
      });

      User.belongsToMany(models.Skill, {
        through: "UserSkill",
        as: "skills",
        foreignKey: "userId",
      });

      User.hasMany(models.Service, {
        foreignKey: "userId",
        as: "services",
      });

      // Relasi dengan Order
      User.hasMany(models.Order, {
        foreignKey: "buyerId",
        as: "purchases", // Orders where the user is the buyer
      });

      User.hasMany(models.Order, {
        foreignKey: "sellerId",
        as: "sales", // Orders where the user is the seller
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      coverImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
