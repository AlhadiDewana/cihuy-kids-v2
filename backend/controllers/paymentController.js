const Payment = require('../models/Payment');
const User = require('../models/User');
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
 limits: { fileSize: 5000000 }, // 5MB limit
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

       const { durationType, amount, bankName, accountName } = req.body;
     
       // Validasi durasi
       const durations = {
         '1_month': 30,
         '3_month': 90,
         '6_month': 180,
         '12_month': 360
       };

       if (!durations[durationType]) {
         return res.status(400).json({ error: 'Invalid duration type' });
       }

       // Validasi jumlah pembayaran
       const prices = {
         '1_month': 50000,
         '3_month': 140000,
         '6_month': 250000,
         '12_month': 450000
       };

       if (amount !== prices[durationType]) {
         return res.status(400).json({ error: 'Invalid amount for selected duration' });
       }

       const payment = await Payment.create({
         userId: req.userId,
         durationType,
         amount,
         bankName,
         accountName,
         proofImage: req.file.path,
         status: 'pending'
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

 async approvePayment(req, res) {
   try {
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: 'Unauthorized' });
     }

     const payment = await Payment.findByPk(req.params.id);
     if (!payment) {
       return res.status(404).json({ error: 'Payment not found' });
     }

     const durations = {
       '1_month': 30,
       '3_month': 90,
       '6_month': 180,
       '12_month': 360
     };

     const user = await User.findByPk(payment.userId);
     const durationDays = durations[payment.durationType];
     
     // Set atau extend premium duration
     const currentDate = new Date();
     const newExpiryDate = user.premiumUntil && user.premiumUntil > currentDate
       ? new Date(user.premiumUntil.getTime() + (durationDays * 24 * 60 * 60 * 1000))
       : new Date(currentDate.getTime() + (durationDays * 24 * 60 * 60 * 1000));

     user.role = 'premium';
     user.premiumUntil = newExpiryDate;
     await user.save();

     payment.status = 'approved';
     await payment.save();

     res.json({
       message: 'Payment approved and premium duration updated',
       payment,
       premiumUntil: newExpiryDate
     });
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
};