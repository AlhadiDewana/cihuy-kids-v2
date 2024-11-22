const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
    login, 
    register, 
    upgrade,
    updateProfile,  // Tambahkan ini
    changePassword, // Tambahkan ini
    getProfile,     // Tambahkan ini
    forgotPassword,
    resetPassword

} = require('../controllers/userController');
const authMiddleware = require('../middleware/jwtMiddleware');

const upload = multer();

// Public routes (tidak perlu login)
router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);

// Protected routes (perlu login)
router.post('/upgrade', authMiddleware, upload.none(), upgrade);
router.get('/profile', authMiddleware, getProfile);
router.put('/update-profile', authMiddleware, upload.none(), updateProfile);
router.put('/change-password', authMiddleware, upload.none(), changePassword);

// Route untuk testing
router.get('/test', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route works!' });
});

//route untuk forgot password
router.post('/forgot-password', upload.none(), forgotPassword);
router.post('/reset-password', upload.none(), resetPassword);

module.exports = router;