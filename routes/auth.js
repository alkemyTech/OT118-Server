const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
// const authMiddleware = require('../middlewares/auth');
const userMiddleware = require('../middlewares/userValidator');

router.post('/register', userMiddleware, usersController.register);

module.exports = router;
