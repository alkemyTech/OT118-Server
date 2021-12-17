const express = require('express');
const activitiesController = require('../controllers/activities');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/activities', authMiddleware.isAuth, authMiddleware.isAdmin, activitiesController.create);