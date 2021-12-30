const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const authMiddleware = require('../middlewares/auth');


router.get("/contacts",authMiddleware.isAdmin, contactsController.getAll)



module.exports = router;