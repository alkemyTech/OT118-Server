const createError = require("http-errors");
const testimonialsRepo = require('../repositories/testimonials');
const {paginate} = require("../modules/pagination");
const pageLimit = 10;

const remove = async (id) => {
  const removedTestimonial = await testimonialsRepo.remove(id);
  if(!removedTestimonial) throw createError(404, "Testimonial not found.")
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

const getAll = async ({baseUrl, page}) => {
  const count = await testimonialsRepo.count();
  const paginatedResult = await paginate(baseUrl,page, pageLimit, count);
  if (count > 0) {
    paginatedResult.data = await testimonialsRepo.getAll(pageLimit, paginatedResult.offset);
  }
  delete paginatedResult.offset;
  return paginatedResult;
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
