const slidesRepository = require('../repositories/slides');



const getAll = async () => {
  let slides = [];
  let data = await slidesRepository.getAll();

  data.forEach(slide => {
    slides.push({
      id : slide.id,
      imageUrl : slide.imageUrl,
      text : slide.text,
      order : slide.order,
      organizationId : slide.organizationId
    })
    
  });

  return slides

}


const remove = async (id) => {
  await slidesRepository.remove(id);
};

module.exports = {
  getAll,
  remove
};
