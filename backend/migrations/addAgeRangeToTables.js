const Video = require('../models/Video');
const Music = require('../models/Music');
const Reading = require('../models/Reading');

const migrate = async () => {
  await Promise.all([
    Video.sync({ alter: true }),
    Music.sync({ alter: true }),
    Reading.sync({ alter: true })
  ]);
  console.log('Age range added to all content tables successfully.');
};

migrate().catch(console.error);