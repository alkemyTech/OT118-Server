const contactsRepository = require('../repositories/contacts');

const create = async (body) => {
    const newContact =  await contactsRepository.create(body)
    return newContact
}

module.exports = {
    create
}


