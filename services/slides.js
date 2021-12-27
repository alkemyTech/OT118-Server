const slidesRepository = require('../repositories/slides');

const create = async(body) => {

  if(body.order == undefined){
    let maxOrder = await slidesRepository.getMaxOrder()

    body.order = maxOrder + 1

  }

  return await slidesRepository.create(body)  

} 

const update = async (id, body) => {
  const slide = await slidesRepository.getById(id);

  if(!slide) {
    throw new Error('slide not fund')
    
  }

  return await slidesRepository.update(body, id)
  
}

const getAll = async () => {
  
  return await slidesRepository.getAll();


}


const remove = async (id) => {
  await slidesRepository.remove(id);
};


module.exports = {

  create,
  remove,
  getAll,
  update,
  remove

};
