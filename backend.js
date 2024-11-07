const express = require('express');
const app = express();
const userRoutes = require('./backend/routes/userRoutes');
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
