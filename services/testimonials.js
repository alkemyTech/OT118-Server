const testimonialsRepo = require('../repositories/testimonials');
const {paginate} = require("../modules/pagination");
const pageLimit = 10;

const remove = async (id) => {
  await testimonialsRepo.remove(id);
};

const getById = async (id) => {
  const testimonial = await testimonialsRepo.getById(id);
  if(!testimonial){
    const error = new Error('testimonial not found.');
      error.status = 404;
      throw error;
  }
    return testimonial;
}

const update = async (id, body) => {
  const Testimonials = await testimonialsRepo.getById(id);
    if(!Testimonials){
      const error = new Error('Testimonials not found.');
      error.status = 404;
      throw error;
    }
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
