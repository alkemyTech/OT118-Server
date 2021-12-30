const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsController = require('../controllers/testimonials');
const testimonialsMiddleware = require('../middlewares/testimonials');
router.delete('/:id', authMiddleware.isAdmin, testimonialsController.remove);
router.post('/',authMiddleware.isAdmin, testimonialsMiddleware.inputValidation, testimonialsController.create);
router.get('/',authMiddleware.isAdmin ,testimonialsController.getAll);
//authmidleware.isAdmin lleva esta ruta
module.exports = router;
