const activitiesService = require('../services/activities');

const create = async (req, res, next) => {
    try {
        const newActivity = await activitiesService.create(req.body);
        res.status(200).json({
            msg: `Activity created succesfully`,
            data: newActivity,
        })        
    } catch (error) {
        next(error)
    }
};

const getAll = async (req, res, next) => {
  try {
    const data = await activitiesService.getAll();
    res.status(200).json({ data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create
};
