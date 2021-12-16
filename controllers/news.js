const newsService = require('../services/news');


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
  remove
};
