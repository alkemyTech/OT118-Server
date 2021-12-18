const newsRepository = require('../repositories/news');

const remove = async (id) => {
    throw new Error('Not implemented');
};
const getById = async (id) => {
    const novelty = await newsRepository.getById(id);
    if (!novelty) {
        const error = new Error('Novelty not found.');
        error.status = 404;
        throw error;
    }
    return novelty;
};

module.exports = {
    remove,
    getById
};
