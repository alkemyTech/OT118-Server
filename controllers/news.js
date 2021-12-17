const newsService = require('../services/news');

const create = async (req, res, next) => {
  try {
    const body = req.body;
    const newNovelty = await newsService.create(body);
    res.status(200).json(newNovelty);
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

module.exports = {
  create,
  remove
};
