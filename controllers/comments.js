const commentsService = require('../services/comments');

const remove = async (req, res, next) => {
  try {
    await commentsService.remove(req.params.id);
    res.status(200).json({ msg: `Comment ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const response = await commentsService.getAll();
    res.status(200).json({msg: `All comments were successfully displayed`, response})
     
  }
  catch(error) {
    next(error)
  }
}

module.exports = {
  remove,
  getAll
};
