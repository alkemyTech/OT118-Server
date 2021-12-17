const express = require('express');
const router = express.Router();
const validateCreateContacts = require("../middlewares/contactsNew")

const contactsController = require('../controllers/contacts');

router.post("/create",validateCreateContacts, contactsController.create)




module.exports = router;
