const newsService = require('../services/news');

const create = async (req, res, next) => {
  try {
    const body = req.body;
    const newNovelty = await newsService.create(body);
    res.status(201).json({msg: "Novelty created successfully", data: newNovelty});
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await newsService.remove(id);
    res.status(200).json({ msg: `News ${id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const novelty = await newsService.getById(id);
    res.status(200).json({data: novelty});
  } catch (error) {
    next(error);
  }
};

const getCommentsByNews = async (req, res, next) => {
  try{
    const id = req.params.id
    const response = await newsService.getCommentsByNews(id);
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  create,
  remove,
  getById,
  getCommentsByNews,
};
