const contactsRepository = require('../repositories/contacts');

const create = async (data) => {
    await contactsRepository.create(data);
}

module.exports = {
    create
}


