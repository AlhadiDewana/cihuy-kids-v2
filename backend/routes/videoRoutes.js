const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer();
const { 
    upload, 
    getAllVideos, 
    getVideoById,
    updateVideo,     // tambah ini
    deleteVideo      // tambah ini
} = require('../controllers/videoController');
const authMiddleware = require('../middleware/jwtMiddleware');

// Public routes
router.get('/', getAllVideos);
router.get('/:id', getVideoById);

// Protected routes
router.post('/upload', authMiddleware, uploadMiddleware.none(), upload);
router.put('/:id', authMiddleware, uploadMiddleware.none(), updateVideo);   // tambah ini
router.delete('/:id', authMiddleware, uploadMiddleware.none(), deleteVideo); // tambah ini

module.exports = router;