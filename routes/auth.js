const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
const { loginValidation, registerValidation } = require('../middlewares/users');
const authMiddleware = require('../middlewares/auth');

router.post('/register', registerValidation, usersController.register);
router.post('/login', loginValidation, usersController.login);
router.get('/me', authMiddleware.isAuth, usersController.getProfile);

module.exports = router;
