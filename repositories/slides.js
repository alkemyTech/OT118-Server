const db = require('../models');



const getAll = async () => {
  const data = await db.Slides.findAll()
  return data
}


const remove = async (id) => {
  const data = await db.Slides.destroy({
    where: { id }
  });
  return data;
};

module.exports = {
  getAll,
  remove
};
