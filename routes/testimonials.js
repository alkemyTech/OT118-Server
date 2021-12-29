const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsController = require('../controllers/testimonials');
const testimonialsMiddleware = require('../middlewares/testimonials');

router.delete('/:id', authMiddleware.isAdmin, testimonialsController.remove);
router.get('/:id', authMiddleware.isAdmin, testimonialsController.getById);
router.put('/:id' , authMiddleware.isAdmin, testimonialsMiddleware.inputValidation ,  testimonialsController.update)
module.exports = router;
