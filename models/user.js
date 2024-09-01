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

      User.hasMany(models.Rating, {
        foreignKey: "userId",
        as: "ratings",
      });

      User.hasMany(models.BankAccount, {
        foreignKey: 'userId',
        as: 'bankAccounts'
      });

      User.hasMany(models.SkillSwap, {
        foreignKey: "offeringUserId",
        as: "offerings",
      });

      User.hasMany(models.SkillSwap, {
        foreignKey: "requestingUserId",
        as: "requests",
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
