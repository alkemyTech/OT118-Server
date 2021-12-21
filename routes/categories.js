const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoryValidator = require('../middlewares/categoryValidator');

router.post('/', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.create);
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);

module.exports = router;
