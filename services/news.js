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

const update = async (id, {name, content, image, categoryId}) => {
    const body = {name, content, image, categoryId};
    const category = await categoryRepository.getById(categoryId);
    if (!category) {
        const error = new Error('Category is invalid.');
        error.status = 400;
        throw error;
    }
    const noveltyToUpdate =  await newsRepository.getById(id);
    if(!noveltyToUpdate[0]) {
        const error = new Error('Novelty not found.');
        error.status = 404;
        throw error;
    }
    const updatedNovelty = await newsRepository.update(id, body);
    if (updatedNovelty[0] === 1){
        return await newsRepository.getById(id);
    }
};

const getAll = async () => {
    return await newsRepository.getAll()
};

module.exports = {
    create,
    remove,
    update,
    getById,
    getAll,
};
