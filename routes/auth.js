const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
// const authMiddleware = require('../middlewares/auth');
const userMiddleware = require('../middlewares/userValidator');
const loginValidation = require('../middlewares/users');
const authMiddleware = require('../middlewares/auth');

router.post('/register', userMiddleware, usersController.register);
router.post('/login', loginValidation, usersController.login);
router.get('/me', authMiddleware.isAuth, usersController.getProfile);

module.exports = router;
