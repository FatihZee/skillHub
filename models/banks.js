'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Banks extends Model {
    static associate(models) {
      // define association here
    }
  }

  Banks.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Banks',
  });

  return Banks;
};
