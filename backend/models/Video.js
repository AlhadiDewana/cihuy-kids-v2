const {
    DataTypes
} = require('sequelize');
const sequelize = require('../../config');

const Video = sequelize.define('Video', {
    ageRange: {
        type: DataTypes.ENUM('4-5', '6-7', '8-9', '10-12'),
        allowNull: false
    },
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
        type: DataTypes.ENUM('education', 'entertainment', 'music', 'story'),
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

module.exports = Video;