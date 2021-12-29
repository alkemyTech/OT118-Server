const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const usersController = require('../controllers/users');
 
router.get('/', authMiddleware.isAdmin, usersController.getAll);

module.exports = router;