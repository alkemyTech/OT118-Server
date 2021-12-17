const newsRepository = require('../repositories/news');

const create = async (body) => {
    return await newsRepository.create(body);
};

const remove = async (id) => {
    throw new Error('Not implemented');
};

module.exports = {
    create,
    remove
};
