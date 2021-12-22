const contactsRepository = require('../repositories/contacts');

const create = async (body) => {
    return newContact =  await contactsRepository.create(body)
}

module.exports = {
    create
}


