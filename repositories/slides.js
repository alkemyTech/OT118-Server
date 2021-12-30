const db = require('../models');
const {Sequelize} = require('sequelize')

const create = async (slide) => {
  const data = await db.Slides.create({
    imageUrl : slide.urlImage,
    text : slide.text,
    order : slide.order,
    organizationId : slide.idOrg
  });
  console.log(data)
  return data

}

const getById = async (id) => {
  return await db.Slides.findByPk(id, {
    attributes: ['imageUrl', 'text', 'order', 'organizationId']
  })
}

const getMaxOrder = async () => {
  return await db.Slides.max('order')

}

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

  create,
  getMaxOrder,
  getAll,
  getById,
  remove
};
