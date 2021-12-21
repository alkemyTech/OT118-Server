const db = require('../models');



const getAll = async () => {
  return await db.Slides.findAll({
    attributes: ['imageUrl', 'text', 'order', 'organizationId']
  })
  
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
