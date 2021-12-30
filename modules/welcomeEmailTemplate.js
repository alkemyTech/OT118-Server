const organizationRepository = require('../repositories/organizations');
const path = require('path');
const ejs = require('ejs');

const createWecolmeEmailTemplate = async (id) => {

    const dataOrg = await organizationRepository.getById(id);
    const data = {
        logo: dataOrg.image,
        name: dataOrg.name,
        welcomeText: dataOrg.welcomeText,
        address: dataOrg.address,
        phone: dataOrg.phone,
        email: dataOrg
    }

    return await ejs.renderFile(path.resolve(__dirname, 'views / welcome-mail.ejs'), data);
}

module.exports = {
    createWecolmeEmailTemplate,
}