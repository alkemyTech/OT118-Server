const slidesRepository = require('../repositories/slides');

const create = async(body) => {

  //logica a implementar
  if(body.order == undefined){
    const slides = await slidesRepository.getAll();

    console.log("slides", slides)

    body.order = slides[slides.length - 1].order + 1

  }
  
  const slide = {
    urlImage : body.imageUrl,
    text : body.text,
    order : body.order,
    idOrg : body.organizationId
  }

  await slidesRepository.create(slide)

} 

const getAll = async () => {
  await slidesRepository.getAll();
};


const remove = async (id) => {
  await slidesRepository.remove(id);
};


module.exports = {
  create,
  remove
  
};
