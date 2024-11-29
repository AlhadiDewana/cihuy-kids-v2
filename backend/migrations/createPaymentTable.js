const Payment = require('../models/Payment');

const migrate = async () => {
  await Payment.sync({ force: true });
  console.log('Payment table created successfully.');
};

migrate().catch(console.error);