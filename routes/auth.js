const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

const usersMiddleware = require('../middlewares/users');
const authMiddleware = require('../middlewares/auth');

router.post('/register', usersMiddleware.registerValidation, usersController.register);
router.post('/login', usersMiddleware.loginValidation, usersController.login);
router.get('/me', authMiddleware.isAuth, usersController.getProfile);

module.exports = router;
