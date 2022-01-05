const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const usersController = require('../controllers/users');

router.delete('/:id', authMiddleware.inOwnUser, usersController.remove);
router.get('/', authMiddleware.isAdmin, usersController.getAll);

module.exports = router;