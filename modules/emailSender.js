/* const sgMail = require("@sendgrid/mail");
const { sendGrid_key, sendGrid_mail } = require('../config/config');

sgMail.setApiKey( sendGrid_key);

const send = async (email, template, subject) => {
  const message = {
    to: email,
    from: sendGrid_mail,
    subject: subject,
    html: template,
  };
    await sgMail.send(message);
  }

module.exports = {
  send
}; */