const membersRepository = require('../repositories/members');

const remove = async (id) => {
  await membersRepository.remove(id);
};

module.exports = {
  remove
};
