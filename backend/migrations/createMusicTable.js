// migrations/createMusicTable.js
const Music = require('../models/Music');

const migrate = async () => {
  await Music.sync({ force: true });
  console.log('Music table created successfully.');
};

migrate().catch(console.error);