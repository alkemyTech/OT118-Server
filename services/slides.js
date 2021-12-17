const slidesRepository = require('../repositories/slides');

const create = async(body) => {

  if(body.order == undefined){
    const slides = await slidesRepository.getAll();

    let orderArray = []

    slides.forEach(slide => {
      orderArray.push(slide.order);
    });

    let maxOrder = Math.max(...orderArray)

    body.order = maxOrder + 1

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
