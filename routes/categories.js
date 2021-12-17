const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.isAdmin, categoriesController.create);
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);

module.exports = router;
