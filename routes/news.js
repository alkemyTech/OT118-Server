const express = require('express');

const router = express.Router();

const newsController = require('../controllers/news');
const newsMiddleware = require('../middlewares/news');
const authMiddleware = require('../middlewares/auth');


router.post('/', newsMiddleware.inputValidation, newsController.create);
router.delete('/:id', authMiddleware.isAdmin, newsController.remove);

module.exports = router;
