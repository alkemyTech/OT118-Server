const slidesRepository = require('../repositories/slides');
const organizationRepository = require('../repositories/organizations');
const createError = require('http-errors');

const create = async(body) => {
  const organization = await organizationRepository.getById(body.organizationId);

  if(!organization){
    throw createError(404, 'OrganizationId not found')
  }

  if(body.order == undefined){
    let maxOrder = await slidesRepository.getMaxOrder()
    body.order = maxOrder + 1
  }
  return await slidesRepository.create(body)
} 

const update = async (id, body) => {
  const slide = await slidesRepository.getById(id);

  if(!slide) {
    throw createError(404, 'Slide not found')
  }

  const updatedSlide = await slidesRepository.update(body, id)
  if(updatedSlide[0] !== 1) {
    throw createError(400, "Slide couldn't be updated")
  }
  return await slidesRepository.getById(id);
}

const getAll = async () => {
  return await slidesRepository.getAll();
}

const getById = async (id) => {
  const data = await slidesRepository.getById(id)

  if(!data){
    throw createError(404, 'Slide not found')
  }
  return data
}

const remove = async (id) => {
  const removedSlide = await slidesRepository.remove(id);

  if(!removedSlide){
    throw createError(400, "Slide couldn't be removed.")
  }
};


module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
};
