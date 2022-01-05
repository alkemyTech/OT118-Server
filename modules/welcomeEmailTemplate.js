const path = require('path');
const ejs = require('ejs');

const createWecolmeEmailTemplate = async (dataOrg) => {

    const data = {
        logo: dataOrg.image,
        name: dataOrg.name,
        welcomeText: dataOrg.welcomeText,
        address: dataOrg.address,
        phone: dataOrg.phone,
        email: dataOrg
    }
    return await ejs.renderFile(path.join(__dirname, "..", "views", "welcome-email.ejs", data));
}

module.exports = {
    createWecolmeEmailTemplate,
}