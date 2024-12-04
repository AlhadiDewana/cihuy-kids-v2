const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const Music = sequelize.define('Musics', {
  title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isUrl: true
      }
  },
  thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isUrl: true
      }
  },
  genre: {
      type: DataTypes.ENUM('Lagu Anak', 'Lagu Nasional'),
      allowNull: false
  },
  isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
  },
  ageRange: {
      type: DataTypes.ENUM('4-5', '6-7', '8-9', '10-12'),
      allowNull: false
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue:0,
    allowNull:false
  }
}, {
  tableName: 'musics',
  timestamps: true
});

module.exports = Music;