// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
