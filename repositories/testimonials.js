const db = require('../models');

const remove = async (id) => {
  const data = await db.Testimonials.destroy({
    where: { id }
  });
  return data;
};

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
  create,
  getAll
};
