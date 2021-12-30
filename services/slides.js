const slidesRepository = require('../repositories/slides');

const create = async(body) => {

  if(body.order == undefined){
    let maxOrder = await slidesRepository.getMaxOrder()

    body.order = maxOrder + 1

  }

  
  const slide = {
    urlImage : body.imageUrl,
    text : body.text,
    order : body.order,
    idOrg : body.organizationId
  }

  return await slidesRepository.create(slide)  

} 


const getAll = async () => {
  
  return await slidesRepository.getAll();


}

const getById = async (id) => {
  const data = await slidesRepository.getById(id)

  if(!data){
    throw new Error("slide not fund")
  }

  return data
}

const remove = async (id) => {
  await slidesRepository.remove(id);
};


module.exports = {

  create,
  remove,
  getAll,
  getById

};
