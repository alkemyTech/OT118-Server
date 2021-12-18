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

module.exports = {
    create,
    remove
};
