require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./backend/config/database');

// Import routes
const userRoutes = require('./backend/routes/userRoutes');
const videoRoutes = require('./backend/routes/videoRoutes');
const musicRoutes = require('./backend/routes/musicRoutes');
const readingRoutes = require('./backend/routes/readingRoutes');
const paymentRoutes = require('./backend/routes/paymentRoutes');
const favoriteRoutes = require('./backend/routes/favoriteRoutes');
const historyRoutes = require('./backend/routes/historyRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:5173'], // Sesuaikan URL frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rate limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' },
});
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Terlalu banyak request reset password. Coba lagi dalam 1 jam.' },
});

// Rate limited routes
app.use('/api/login', loginLimiter);
app.use('/api/forgot-password', forgotPasswordLimiter);

// Routes
app.use('/api', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/reading', readingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/history', historyRoutes);

// Static uploads
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

// Sync database and start server
const PORT = process.env.PORT || 9000;

sequelize.sync({ alter: true }) // Gunakan { force: true } untuk reset database
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

module.exports = app;
