const express = require('express');

const router = express.Router();

const newsController = require('../controllers/news');
const authMiddleware = require('../middlewares/auth');


router.post('/', newsController.create);
router.delete('/:id', authMiddleware.isAdmin, newsController.remove);

module.exports = router;
