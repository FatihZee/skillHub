"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
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

      User.hasMany(models.Order, {
        foreignKey: "buyerId",
        as: "purchases",
      });

      User.hasMany(models.Order, {
        foreignKey: "sellerId",
        as: "sales",
      });

      // Relasi dengan Rating
      User.hasMany(models.Rating, {
        foreignKey: "userId",
        as: "ratings",
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
