const contactsRepository = require('../repositories/contacts');


const getAll = async () => {
    const listContacts =  await contactsRepository.getAll()
    return listContacts
}
const create = async (body) => {
    return newContact =  await contactsRepository.create(body)
}

module.exports = {
    getAll,
    create
}

