// backend/models/Video.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Video = sequelize.define('Video', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    videoUrl: {
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
    category: {
        type: DataTypes.ENUM('Edukasi', 'Hiburan'),
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
    viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Video;