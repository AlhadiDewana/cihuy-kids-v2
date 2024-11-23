// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.NODE_ENV === 'test' ? 'cihuy_kids_test' : 'cihuy_kids',
  logging: false
});

module.exports = sequelize;