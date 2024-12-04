const Payment = require('../models/Payment');
const User = require('../models/User');

const migrate = async () => {
  await Promise.all([
    Payment.sync({ alter: true }),
    User.sync({ alter: true })
  ]);
  console.log('Tables updated successfully');
};

migrate().catch(console.error);