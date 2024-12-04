const express = require('express');
const router = express.Router();
const {
  paymentController, // Mengambil semua fungsi dari namespace paymentController
  upload,
  handleMulterError,
} = require('../controllers/paymentController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Public routes
router.get('/subscription-plans', paymentController.getSubscriptionPlans);

// User routes
router.post(
  '/create',
  jwtMiddleware, // Verifikasi JWT
  (req, res, next) => upload(req, res, (err) => handleMulterError(err, req, res, next)), // Upload file bukti pembayaran
  paymentController.createPayment
);

router.get('/history', jwtMiddleware, paymentController.getPaymentHistory);

// Admin routes
router.get('/all', jwtMiddleware, paymentController.getAllPayments);
router.put('/approve/:id', jwtMiddleware, paymentController.approvePayment);
router.put('/reject/:id', jwtMiddleware, paymentController.rejectPayment);

module.exports = router;
