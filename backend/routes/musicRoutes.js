const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer();
const { 
   upload, 
   getAllMusic, 
   getMusicById,
   updateMusic,
   deleteMusic
} = require('../controllers/musicController');
const authMiddleware = require('../middleware/jwtMiddleware');

// Public routes
router.get('/', getAllMusic);
router.get('/:id', getMusicById);

// Protected routes
router.post('/upload', authMiddleware, uploadMiddleware.none(), upload);
router.put('/:id', authMiddleware, uploadMiddleware.none(), updateMusic);
router.delete('/:id', authMiddleware, uploadMiddleware.none(), deleteMusic);

module.exports = router;