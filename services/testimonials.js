const testimonialsRepo = require('../repositories/testimonials');

const remove = async (id) => {
  await testimonialsRepo.remove(id);
};

const getAll = async () => {
  const listTestimonials = await testimonialsRepo.getAll();
  return listTestimonials
};


const create = async (body) => {
  return await testimonialsRepo.create(body);
};
module.exports = {
  remove,
  create,
  getAll
};
