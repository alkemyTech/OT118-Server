const express = require('express');

const router = express.Router();

const usersMiddleware = require('../middlewares/users');
const usersController = require('../controllers/users');

router.post('/login', usersMiddleware.loginValidation, usersController.login);

module.exports = router;
