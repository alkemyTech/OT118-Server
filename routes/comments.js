const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');
// const commentsMiddleware = require('../middlewares/comments');

// router.delete('/:id', commentsMiddleware.isOwnComment, commentsController.remove);

router.delete('/:id', commentsController.remove);

module.exports = router;
