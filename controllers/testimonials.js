const testimonialsService = require('../services/testimonials');

const remove = async (req, res, next) => {
  try {
    await testimonialsService.remove(req.params.id);
    res.status(200).json({ msg: `Testimonial ${req.params.id} removed succesfully` });
  } catch (e) {
    next(e);
  }
};

const update = async (req , res ,next) => {
  try{
    response = await testimonialsService.update(req.params.id , req.body);
    res.status(200).json({ msg: `Testimonial ${req.params.id} updated succesfully`, data: response });
  }catch (e) {
    next(e);
  }

};

  const getById = async (req, res , next) => {
    try{
      const testimonial = await testimonialsService.getById(req.params.id);
      res.status(200).json({
        data: testimonial

      });


    }catch(e){
      next(e);


    }


  };




const getAll = async (req, res, next) => {
  try {
    const data = await testimonialsService.getAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = await testimonialsService.create(req.body);
    res.status(201).json({ msg: `Testimonial ${data.name} created succesfully`, data });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getById,
  update,
   getAll,
  create,
  remove
};
