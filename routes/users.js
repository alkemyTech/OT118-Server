const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const usersController = require('../controllers/users');
 const usersMiddleware = require('../middlewares/users')

router.get('/', authMiddleware.isAdmin, usersController.getAll);
router.put('/:id' , usersMiddleware, usersController.update );

module.exports = router;