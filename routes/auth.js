const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const authController = require('../controllers/auth');

router.post('/login', authMiddleware.loginInputValidation, authController.login);

module.exports = router;
