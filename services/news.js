const newsRepository = require('../repositories/news');
const categoryRepository = require('../repositories/categories');

const {newsCategoryName} = require("../config/config");

const create = async (body) => {
    const newsCategory = await categoryRepository.getByName(newsCategoryName)
    if (!newsCategory) throw new Error("News Category not found");
    body.categoryId = newsCategory.id;
    return await newsRepository.create(body);
};

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



const getAll = async () => {
    return await newsRepository.getAll()
};

module.exports = {
    create,
    remove,
    getById,
<<<<<<< HEAD
=======
    getCommentsByNews,
    getAll,
>>>>>>> 44d00a068fdad188cfd6884131c5de36adac4def
};
