const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer();
const { 
   uploadMusic, 
   getMusicList, 
   getMusicById,
   updateMusic,
   deleteMusic
} = require('../controllers/musicController');
const authMiddleware = require('../middleware/jwtMiddleware');

// Public routes
router.get('/', getMusicList);
router.get('/:id', getMusicById);

// Protected routes
router.post('/upload', uploadMiddleware.none(), uploadMusic);
router.put('/:id', authMiddleware, uploadMiddleware.none(), updateMusic);
router.delete('/:id', authMiddleware, uploadMiddleware.none(), deleteMusic);

module.exports = router;