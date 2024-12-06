const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const Reading = sequelize.define('Reading', {
  ageRange: {
    // Menyesuaikan dengan validasi controller yang menerima beberapa range usia
    type: DataTypes.ENUM('4-5', '6-7', '8-9', '10-12'),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  genre: {
    type: DataTypes.ENUM('story', 'education', 'comic'),
    allowNull: false,
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Reading;
