const express = require('express');

const router = express.Router();

const organizationController = require('../controllers/organizations');
const organizationMiddleware = require('../middlewares/organizations');
const authMiddleware = require('../middlewares/auth');

router.get('/public', organizationController.getPublicInfo)
router.put('/public', authMiddleware.isAdmin, organizationMiddleware.inputValidation, organizationController.update);

module.exports = router;
