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


const getAll = async () => {
  const data = await db.Testimonials.findAll({
    attributes: { exclude: ['deletedAt'] }
    });
  return data;
};

const create = async (body) => {
  return await db.Testimonials.create(body);
};

module.exports = {
  remove,
  getById,
  update,
  create,
  getAll
};
