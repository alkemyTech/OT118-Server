const createError = require("http-errors");
const newsRepository = require('../repositories/news');
const categoryRepository = require('../repositories/categories');

const {newsCategoryName} = require("../config/config");
const { paginate } = require("../modules/pagination");
const pageLimit = 10

const create = async (body) => {
    const newsCategory = await categoryRepository.getByName(newsCategoryName)
    console.log(newsCategory);
    if (!newsCategory) throw createError(404, "CategoryId not found.");

    body.categoryId = newsCategory.id;
    return await newsRepository.create(body);
}

const remove = async (id) => {
    const wasRemoved = await newsRepository.remove(id);
    if (!wasRemoved) throw createError(404, "Novelty not found.")
}

const getById = async (id) => {
    const novelty = await newsRepository.getById(id);
    if (!novelty) throw createError(404, "Novelty not found.")

    return novelty;
}

const update = async (id, {name, content, image, categoryId}) => {
    const body = {name, content, image, categoryId};

    const category = await categoryRepository.getById(categoryId);
    if (!category) throw createError(404, "CategoryId not found.");

    const noveltyToUpdate =  await newsRepository.getById(id);
    if (!noveltyToUpdate) throw createError(404, "Novelty not found.");

    const updatedNovelty = await newsRepository.update(id, body);
    if (updatedNovelty[0] !== 1) throw createError(400, "Novelty couldn't be updated");

    return await newsRepository.getById(id);
}

const getAll = async (params) => {
    const newsCount = await newsRepository.count()
    const paginationResult = await paginate(params.baseUrl, params.page, pageLimit, newsCount)
    if(newsCount > 0){
         paginationResult.data =  await newsRepository.getAll(pageLimit, paginationResult.offset)
    }
    delete paginationResult.offset
    return paginationResult
};

module.exports = {
    create,
    remove,
    update,
    getById,
    getAll,
}
