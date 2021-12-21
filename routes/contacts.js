const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const authMiddleware = require('../middlewares/auth');

// router.get("/", authMiddleware.isAdmin, contactsController.getAll)
router.get("/", contactsController.getAll)



module.exports = router;