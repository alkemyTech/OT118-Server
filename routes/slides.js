const express = require('express');
const slidesController = require('../controllers/slides');
const authMiddleware = require('../middlewares/auth');
const slidesValidation = require('../middlewares/slideValidator')

const router = express.Router();


router.post('/', authMiddleware.isAdmin, slidesValidation.validationFields ,slidesController.create)
router.get('/', authMiddleware.isAdmin, slidesController.getAll);
router.get('/:id', authMiddleware.isAdmin, slidesController.getById)
router.put('/:id', authMiddleware.isAdmin, slidesController.update);
router.delete('/:id', authMiddleware.isAdmin, slidesController.remove);

module.exports = router;
