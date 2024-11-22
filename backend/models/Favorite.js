const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const Favorite = sequelize.define('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contentType: {
    type: DataTypes.ENUM('video', 'music', 'reading'),
    allowNull: false
  }
});