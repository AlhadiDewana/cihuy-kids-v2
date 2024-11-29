const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer();
const { 
    upload, 
    getAllReading, 
    getReadingById,
    updateReading,
    deleteReading
} = require('../controllers/readingController');
const authMiddleware = require('../middleware/jwtMiddleware');

// Public routes
router.get('/', getAllReading);
router.get('/:id', getReadingById);

// Protected routes
router.post('/upload', authMiddleware, uploadMiddleware.none(), upload);
router.put('/:id', authMiddleware, uploadMiddleware.none(), updateReading);
router.delete('/:id', authMiddleware, uploadMiddleware.none(), deleteReading);

module.exports = router;