const testimonialsRepo = require('../repositories/testimonials');
const createError = require("http-errors");

const remove = async (id) => {
  await testimonialsRepo.remove(id);
};

const getById = async (id) => {
  const testimonial = await testimonialsRepo.getById(id);
  if(!testimonial) throw createError(404, "Testimonial not found.");
  return testimonial;
}

const update = async (id, body) => {
  const Testimonials = await testimonialsRepo.getById(id);
  if(!Testimonials) throw createError(404, "Testimonial not found.")
  await testimonialsRepo.update(id, body);
  const testimonialUpdated = await testimonialsRepo.getById(id);
  return testimonialUpdated;
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
  getAll,
  getById,
  update
};
