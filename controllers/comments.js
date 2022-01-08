const commentsService = require('../services/comments');

const remove = async (req, res, next) => {
  try {
    await commentsService.remove(req.params.id);
    res.status(200).json({ msg: `Comment ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const body = req.body
    const newComment = await commentsService.create(body)
    res.status(200).json({ msg: 'Comment created succesfully', data: newComment })
  }
  catch (error){
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await commentsService.getAll();
    res.status(200).json({ msg: `All comments were successfully displayed`, data: response })
  }
  catch(error) {
    next(error)
  }
}


const getCommentsByNews = async (req, res, next) => {
  try{
    const id = req.params.id
    const response = await commentsService.getCommentsByNews(id);
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try{
    const response = await commentsService.update(req.body, req.params.id)
    res.status(200).json({
      msg: `Comment updated successfully`,
      data: response
    })
  }
  catch(error){
    next(error)
  }
}

module.exports = {
  remove,
  create,
  getAll,
  getCommentsByNews,
  update,
};
