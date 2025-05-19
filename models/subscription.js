'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      // define association here
    }
  }
  Subscription.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    frequency: {
      type: DataTypes.ENUM('hourly', 'daily'),
      allowNull: false
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};
