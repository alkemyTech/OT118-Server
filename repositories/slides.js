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


const getMaxOrder = async () => {
  return await db.Slides.max('order')

}

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
  create,
  getAll,
  getMaxOrder,
  remove
};
