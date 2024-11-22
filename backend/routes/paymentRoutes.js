const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPaymentHistory,
  getAllPayments,
  approvePayment,
  rejectPayment
} = require('../controllers/paymentController');
const authMiddleware = require('../middleware/jwtMiddleware');

// User routes
router.post('/create', authMiddleware, createPayment);
router.get('/history', authMiddleware, getPaymentHistory);

// Admin routes
router.get('/all', authMiddleware, getAllPayments);
router.put('/approve/:id', authMiddleware, approvePayment);
router.put('/reject/:id', authMiddleware, rejectPayment);

module.exports = router;