const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const usersController = require('../controllers/users');
const paginationMiddleware = require('../middlewares/pagination')

router.get('/', authMiddleware.isAdmin, paginationMiddleware.validator, usersController.getAll);

module.exports = router;