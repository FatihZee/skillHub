'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserSkill extends Model {
    static associate(models) {
      // Define association here
    }
  }
  
  UserSkill.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    skillId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Skills',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserSkill',
  });
  
  return UserSkill;
};
