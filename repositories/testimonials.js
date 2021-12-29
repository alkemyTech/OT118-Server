const db = require('../models');

const remove = async (id) => {
  const data = await db.Testimonials.destroy({
    where: { id }
  });
  return data;
}

const getById = async (id) => {
  const getTestimonial = await db.Testimonials.findByPk(id);
   return getTestimonial;

}

const update = async(id , body ) => {

  const testimonialUpdated = await db.Testimonials.update(body , {

      where: { id }
  });

    return testimonialUpdated;


}


module.exports = {
  remove,
  getById,
  update
};
