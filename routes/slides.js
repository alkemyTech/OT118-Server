const express = require('express');
const slidesController = require('../controllers/slides');
const authMiddleware = require('../middlewares/auth');
const slidesValidation = require('../middlewares/slideValidator')

const router = express.Router();


router.post('/', slidesValidation.validationFields ,slidesController.create)
router.get('/', slidesController.getAll);
router.delete('/:id', authMiddleware.isAdmin, slidesController.remove);

module.exports = router;
