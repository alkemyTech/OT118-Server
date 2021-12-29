const testimonialsRepo = require('../repositories/testimonials');

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

  }

module.exports = {
  remove,
  getById,
  update
};
