const express = require('express');
const slidesController = require('../controllers/slides');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.delete('/:id', authMiddleware.isAdmin, slidesController.remove);

module.exports = router;
