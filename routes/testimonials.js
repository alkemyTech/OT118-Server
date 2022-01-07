const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsController = require('../controllers/testimonials');
const testimonialsMiddleware = require('../middlewares/testimonials');
const paginationMiddleware = require('../middlewares/pagination')

router.get('/:id', authMiddleware.isAdmin, testimonialsController.getById);
router.put('/:id' , authMiddleware.isAdmin, testimonialsMiddleware.inputValidation ,  testimonialsController.update);
router.delete('/:id', authMiddleware.isAdmin, testimonialsController.remove);
router.post('/',authMiddleware.isAdmin, testimonialsMiddleware.inputValidation, testimonialsController.create);
router.get('/',authMiddleware.isAdmin, paginationMiddleware.validator, testimonialsController.getAll);

module.exports = router;
