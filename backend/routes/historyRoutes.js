const express = require('express');
const router = express.Router();
const { 
  addHistory, 
  getHistory, 
  clearHistory 
} = require('../controllers/historyController');
const authMiddleware = require('../middleware/jwtMiddleware');

router.post('/add', authMiddleware, addHistory);
router.get('/', authMiddleware, getHistory);
router.delete('/clear', authMiddleware, clearHistory);

module.exports = router;