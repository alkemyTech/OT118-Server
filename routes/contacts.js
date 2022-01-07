const express = require('express');
const router = express.Router();


const contactsController = require('../controllers/contacts');
const authMiddleware = require('../middlewares/auth');
const validateCreateContacts = require("../middlewares/contacts")

router.post("/",validateCreateContacts, contactsController.create)



module.exports = router;
