require('dotenv').config(); // Tambahkan ini di awal
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./backend/routes/userRoutes');

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