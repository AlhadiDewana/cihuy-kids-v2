const express = require('express');
const router = express.Router();
const multer = require('multer');
const {login , register, upgrade} = require('../controllers/userController');

const upload = multer();

router.post('/register',upload.none(), register);
router.post('/login', upload.none(),login);
router.post('/upgrade',upload.none(), upgrade);

module.exports = router;
