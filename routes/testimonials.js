const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsController = require('../controllers/testimonials');

router.delete('/:id', authMiddleware.isAdmin, testimonialsController.remove);

module.exports = router;
