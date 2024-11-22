const { DataTypes } = require('sequelize');
const sequelize = require('../../config');

const Payment = sequelize.define('Payment', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  proofImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Payment;