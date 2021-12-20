const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');
////// Remove this comment before pull request
//const commentsMiddleware = require('../middlewares/comments');

router.delete('/:id', commentsMiddleware.isOwnComment, commentsController.remove);

module.exports = router;
