const testimonialsRepo = require('../repositories/testimonials');

const remove = async (id) => {
  await testimonialsRepo.remove(id);
};

module.exports = {
  remove
};
