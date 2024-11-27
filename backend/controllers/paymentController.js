const Payment = require('../models/Payment');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directory if not exists
const uploadDir = './public/payment-proofs';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/payment-proofs')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'payment-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: Images Only! (jpg, jpeg, png)'));
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
}).single('proofImage');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = {
  upload,
  handleMulterError,
  paymentController: {
    async createPayment(req, res) {
      try {
        const { 
            durationType, 
            amount, 
            bankName, 
            accountName 
        } = req.body;

        // Get file from multer
        const proofImage = req.file?.filename;

        if (!proofImage) {
            return res.status(400).json({ error: 'Bukti pembayaran diperlukan' });
        }

        const payment = await Payment.create({
            userId: req.userId, // Dari JWT middleware
            durationType,
            amount,
            status: 'pending',
            proofImage,
            bankName,
            accountName,
            notes: req.body.notes || null
        });

        res.status(201).json({
            message: 'Payment created successfully',
            payment
        });

      } catch (error) {
          console.error('Error creating payment:', error);
          res.status(500).json({ error: error.message });
      }
    },

    async getPaymentHistory(req, res) {
      try {
        const payments = await Payment.findAll({
          where: { userId: req.userId }
        });
        res.json(payments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    async getAllPayments(req, res) {
      try {
        const payments = await Payment.findAll();
        res.json({ payments });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    async approvePayment(req, res) {
      try {
        const { status } = req.body;

        if (!['success', 'failed'].includes(status)) {
          return res.status(400).json({ error: 'Invalid status' });
        }

        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
          return res.status(404).json({ error: 'Payment not found' });
        }

        if (status === 'success') {
          const durations = {
            '1_month': 30,
            '12_month': 360
          };

          const user = await User.findByPk(payment.userId);
          const durationDays = durations[payment.durationType];

          const currentDate = new Date();
          const newExpiryDate = user.premiumUntil && user.premiumUntil > currentDate
            ? new Date(user.premiumUntil.getTime() + (durationDays * 24 * 60 * 60 * 1000))
            : new Date(currentDate.getTime() + (durationDays * 24 * 60 * 60 * 1000));

          user.isPremium = 1;
          user.premiumUntil = newExpiryDate;
          await user.save();

          payment.status = 'success';
          await payment.save();

          return res.json({
            message: 'Payment approved and premium duration updated',
            payment,
            premiumUntil: newExpiryDate
          });

        } else {
          payment.status = 'failed';
          await payment.save();

          return res.json({
            message: 'Payment rejected',
            payment
          });
        }

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    async rejectPayment(req, res) {
      try {
        if (req.user.role !== 'admin') {
          return res.status(403).json({ error: 'Unauthorized' });
        }

        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
          return res.status(404).json({ error: 'Payment not found' });
        }

        payment.status = 'rejected';
        await payment.save();

        res.json({
          message: 'Payment rejected',
          payment
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    async getSubscriptionPlans(req, res) {
      try {
        const plans = [
          {
            id: '1_month',
            duration: '1 Bulan',
            price: 50000,
            description: '1 Bulan Premium Access'
          },
          {
            id: '3_month',
            duration: '3 Bulan',
            price: 140000,
            description: '3 Bulan Premium Access + Diskon 10%'
          },
          {
            id: '6_month',
            duration: '6 Bulan',
            price: 250000,
            description: '6 Bulan Premium Access + Diskon 15%'
          },
          {
            id: '12_month',
            duration: '12 Bulan',
            price: 450000,
            description: '12 Bulan Premium Access + Diskon 25%'
          }
        ];
        res.json(plans);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
};

