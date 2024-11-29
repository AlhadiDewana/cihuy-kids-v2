const express = require('express');
const router = express.Router();
const { 
  addFavorite, 
  removeFavorite, 
  getFavorites 
} = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/jwtMiddleware');

router.post('/add', authMiddleware, addFavorite);
router.delete('/remove/:contentType/:contentId', authMiddleware, removeFavorite);
router.get('/', authMiddleware, getFavorites);

module.exports = router;
