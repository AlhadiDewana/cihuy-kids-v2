const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer();

const {
    getVideos,
    getVideoById,
    uploadVideo,
    updateVideo,
    deleteVideo,
} = require('../controllers/videoController');
const authMiddleware = require('../middleware/jwtMiddleware');
const adminMiddleware = require('../middleware/adminCheck');

// Public routes
router.get('/', getVideos);                      // Get all videos
router.get('/:id', getVideoById);                // Get video by ID

// Admin-only routes
router.post('/upload', [authMiddleware, adminMiddleware, uploadMiddleware.none()], uploadVideo);    // Admin upload
router.put('/:id', [authMiddleware, adminMiddleware, uploadMiddleware.none()], updateVideo);        // Admin update
router.delete('/:id', [authMiddleware, adminMiddleware], deleteVideo);                             // Admin delete

module.exports = router;