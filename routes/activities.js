const express = require('express');
const activitiesController = require('../controllers/activities');
const authMiddleware = require('../middlewares/auth');
const validationFields = require('../middlewares/activities')

const router = express.Router();

router.post('/', [
    authMiddleware.isAuth, 
    authMiddleware.isAdmin, 
    validationFields
], activitiesController.create);

module.exports = router;