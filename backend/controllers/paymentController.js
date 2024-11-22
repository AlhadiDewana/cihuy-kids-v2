const Payment = require('../models/Payment');
const User = require('../models/modelUser');
const multer = require('multer');
const path = require('path');

// Konfigurasi upload gambar
const storage = multer.diskStorage({
  destination: './uploads/payment-proofs',
  filename: function(req, file, cb) {
    cb(null, 'payment-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('proofImage');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = {
  async createPayment(req, res) {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }

        if (!req.file) {
          return res.status(400).json({ error: 'Please upload proof of payment' });
        }

        const { amount, bankName, accountName, notes } = req.body;
        const payment = await Payment.create({
          userId: req.userId,
          amount,
          proofImage: req.file.path,
          bankName,
          accountName,
          notes
        });

        res.status(201).json({ 
          message: 'Payment submitted successfully',
          payment 
        });
      });
    } catch (error) {
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

  // Admin only
  async getAllPayments(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const payments = await Payment.findAll({
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Admin only
  async approvePayment(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      payment.status = 'approved';
      await payment.save();

      // Upgrade user to premium
      const user = await User.findByPk(payment.userId);
      user.role = 'premium';
      await user.save();

      res.json({ 
        message: 'Payment approved and user upgraded to premium',
        payment 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Admin only
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
  }
};