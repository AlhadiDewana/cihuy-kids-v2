const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const Reading = sequelize.define('Reading', {
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
    defaultValue: false
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Reading;