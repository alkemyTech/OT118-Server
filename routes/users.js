const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const usersController = require('../controllers/users');

router.delete('/:id', authMiddleware.isAuth,authMiddleware.inOwnUser, usersController.remove);

module.exports = router;