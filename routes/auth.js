const express = require('express');

const router = express.Router();

const loginValidation = require('../middlewares/users');
const usersController = require('../controllers/users');

router.post('/login', loginValidation, usersController.login);

module.exports = router;
