const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const paginationMiddleware = require('../middlewares/pagination')
const usersController = require('../controllers/users');
const usersMiddleware = require('../middlewares/users')

router.delete('/:id', authMiddleware.inOwnUser, usersController.remove);
router.get('/', authMiddleware.isAdmin, paginationMiddleware.validator, usersController.getAll);
router.put('/:id' , usersMiddleware, usersController.update );


module.exports = router;