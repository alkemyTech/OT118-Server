const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoryValidator = require('../middlewares/categoryValidator');
const paginationMiddleware = require('../middlewares/pagination')

router.post('/', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.create);
router.get('/', authMiddleware.isAdmin, paginationMiddleware.validator, categoriesController.getAll);
router.put('/:id', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.update);
router.get('/:id', authMiddleware.isAdmin, categoriesController.getById);
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);

module.exports = router;
