const contactsService = require("../services/contacts");
const { send } = require("../modules/emailSender");
const { organizationId } = require('../config/config' );
const { getTemplateMail } = require("../modules/contactMail");

const getAll = async (req, res, next) => {
  try {
    const listContacts = await contactsService.getAll();
    return res.status(200).json({
      data: listContacts,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newContact = await contactsService.create(req.body);

    const template = await getTemplateMail(organizationId);
    let subject = "Email de confirmación";
    await send(newContact.email, template, subject)
    
    return res.status(201).json({
      msg: "contact created successfully",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
