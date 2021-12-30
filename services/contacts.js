const contactsRepository = require('../repositories/contacts');

const getAll = async () => {
    const listContacts =  await contactsRepository.getAll()
    return listContacts
}

module.exports = {
    getAll
}