// migrations/createVideoTable.js
const Video = require('../models/Video');

const migrate = async () => {
  await Video.sync({ force: true });
  console.log('Video table created successfully.');
};

migrate().catch(console.error);