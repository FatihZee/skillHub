"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      // Define association here
      Skill.belongsToMany(models.User, {
        through: "UserSkill",
        as: "users",
        foreignKey: "skillId",
      });

      // Tambahkan ini di metode associate
      Skill.hasMany(models.Service, {
        foreignKey: "skillId",
        as: "services",
      });
    }
  }

  Skill.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Skill",
    }
  );

  return Skill;
};
