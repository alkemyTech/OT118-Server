const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoryValidator = require('../middlewares/categories');

router.post('/', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.create);
router.get('/', categoriesController.getAll);
router.put('/:id', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.update);
router.get('/:id', authMiddleware.isAdmin, categoriesController.getById);
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);

module.exports = router;
