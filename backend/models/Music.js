const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const Music = sequelize.define('Music', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.ENUM('lullaby', 'education', 'entertainment', 'story'),
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

module.exports = Music;