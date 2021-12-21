const express = require('express');
const activitiesController = require('../controllers/activities');
const authMiddleware = require('../middlewares/auth');
const activitiesValidation = require('../middlewares/activities')

const router = express.Router();

router.post('/',
    authMiddleware.isAdmin, 
    activitiesValidation.validationFields , 
    activitiesController.create);

module.exports = router;