const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.delete('/:id', usersController.remove);

module.exports = router;