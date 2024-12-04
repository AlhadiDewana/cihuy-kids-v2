const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const History = sequelize.define('History', {
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
    },
    lastAccessed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });