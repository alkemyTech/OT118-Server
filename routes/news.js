const express = require('express');

const router = express.Router();

const newsController = require('../controllers/news');
const newsMiddleware = require('../middlewares/news');
const authMiddleware = require('../middlewares/auth');
const commentsController = require("../controllers/comments");

router.post('/', authMiddleware.isAdmin, newsMiddleware.inputValidation, newsController.create);
router.get('/', authMiddleware.isAuth, newsController.getAll);
router.delete('/:id', authMiddleware.isAdmin, newsController.remove);
router.get('/:id', authMiddleware.isAdmin, newsController.getById);
router.put('/:id', authMiddleware.isAdmin, newsMiddleware.inputValidation, newsController.update);
router.get('/:id/comments', authMiddleware.isAuth, commentsController.getCommentsByNews);

module.exports = router;
