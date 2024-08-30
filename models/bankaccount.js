'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccount extends Model {
    static associate(models) {
      BankAccount.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      BankAccount.belongsTo(models.Banks, {
        foreignKey: 'bankId',
        as: 'bank'
      });
    }
  }
  BankAccount.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BankAccount',
  });
  return BankAccount;
};
