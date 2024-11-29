const app = require('./backend');

const PORT = process.env.API_PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});