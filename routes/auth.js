const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
// const authMiddleware = require('../middlewares/auth');
const userMiddleware = require('../middlewares/userValidator');
const loginValidation = require('../middlewares/users');

router.post('/register', userMiddleware, usersController.register);
router.post('/login', loginValidation, usersController.login);


module.exports = router;
