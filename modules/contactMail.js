const ejs = require("ejs");
const path = require("path");
const organizationsService = require("../services/organizations");

const getTemplateMail = async (organizationId) => {
  const organization = await organizationsService.getById(organizationId);
  const templatePath = path.join(__dirname, "..", "views", "contact-email.ejs");
  return await ejs.renderFile(templatePath, {
    emailOrganization: organization.email,
    phone: organization.phone,
  });
};

module.exports = {
  getTemplateMail,
};
