const commentsRepository = require('../repositories/comments');

const remove = async (id) => {
  await commentsRepository.remove(id);
};

const create = async (body) => {
  await commentsRepository.create(body)
}

module.exports = {
  remove,
  create
};
