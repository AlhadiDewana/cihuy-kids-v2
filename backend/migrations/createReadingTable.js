const Reading = require('../models/Reading');

const migrate = async () => {
  await Reading.sync({ force: true });
  console.log('Reading table created successfully.');
};

migrate().catch(console.error);