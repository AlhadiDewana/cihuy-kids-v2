require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const userRoutes = require('./backend/routes/userRoutes');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' }
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Terlalu banyak request reset password. Coba lagi dalam 1 jam.' }
});

app.use('/api/login', loginLimiter);
app.use('/api/forgot-password', forgotPasswordLimiter);

// Konfigurasi CORS yang lebih spesifik
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Sesuaikan dengan port frontend Anda
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
});

const PORT = process.env.API_PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//video routes
const videoRoutes = require('./backend/routes/videoRoutes');
app.use('/api/videos', videoRoutes);

//musik routes
const musicRoutes = require('./backend/routes/musicRoutes');
app.use('/api/music', musicRoutes);

//bacaan
const readingRoutes = require('./backend/routes/readingRoutes');
app.use('/api/reading', readingRoutes);

//pembayaran ceunah
const paymentRoutes = require('./backend/routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);