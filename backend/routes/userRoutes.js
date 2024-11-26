const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
    login, 
    register, 
    upgrade,
    updateProfile,
    changePassword,
    getProfile,
    forgotPassword,
    resetPassword
} = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const upload = multer();

// Public routes (tidak perlu login)
router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.post('/forgot-password', upload.none(), forgotPassword);
router.post('/reset-password', upload.none(), resetPassword);

// Protected routes (perlu login)
router.post('/upgrade', jwtMiddleware, upload.none(), upgrade);
router.get('/profile', jwtMiddleware, getProfile);
router.put('/update-profile', jwtMiddleware, upload.none(), updateProfile);
router.put('/change-password', jwtMiddleware, upload.none(), changePassword);

// Route untuk testing
router.get('/test', jwtMiddleware, (req, res) => {
    res.json({ message: 'Protected route works!' });
});

module.exports = router;