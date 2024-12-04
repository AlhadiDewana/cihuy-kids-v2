const { Favorite, History } = require('../models/Favorite');

const migrate = async () => {
  await Favorite.sync({ force: true });
  await History.sync({ force: true });
  console.log('Favorite and History tables created successfully.');
};

migrate().catch(console.error);