const express = require('express');

const router = express.Router();

const newsController = require('../controllers/news');
const commentsController = require('../controllers/comments')
const newsMiddleware = require('../middlewares/news');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.isAdmin, newsMiddleware.inputValidation, newsController.create);
router.delete('/:id', authMiddleware.isAdmin, newsController.remove);
router.get('/:id', authMiddleware.isAdmin, newsController.getById);
router.get('/:id/comments', newsController.getCommentsByNews)

module.exports = router;
