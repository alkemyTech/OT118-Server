const slidesRepository = require('../repositories/slides');

const create = async(body) => {



  if(body.order == undefined){
    let maxOrder = await slidesRepository.getMaxOrder()

    body.order = maxOrder[0].order + 1


  }

  
  const slide = {
    urlImage : body.imageUrl,
    text : body.text,
    order : body.order,
    idOrg : body.organizationId
  }

  await slidesRepository.create(slide)

} 

const remove = async (id) => {
  await slidesRepository.remove(id);
};


module.exports = {
  create,
  remove  
};
