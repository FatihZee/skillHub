"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SkillSwap extends Model {
    static associate(models) {
      SkillSwap.belongsTo(models.User, {
        foreignKey: "offeringUserId",
        as: "offeringUser",
      });

      SkillSwap.belongsTo(models.User, {
        foreignKey: "requestingUserId",
        as: "requestingUser",
      });

      SkillSwap.belongsTo(models.Skill, {
        foreignKey: "offeredSkillId",
        as: "offeredSkill",
      });

      SkillSwap.belongsTo(models.Skill, {
        foreignKey: "requestedSkillId",
        as: "requestedSkill",
      });
    }
  }

  SkillSwap.init(
    {
      offeringUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      requestingUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      offeredSkillId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Skills',
          key: 'id'
        }
      },
      requestedSkillId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Skills',
          key: 'id'
        }
      },
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'accepted', 'rejected'],
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: "SkillSwap",
    }
  );

  return SkillSwap;
};
