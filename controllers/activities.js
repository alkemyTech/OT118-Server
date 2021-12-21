const activitiesService = require('../services/activities');

const getAll = async (req, res, next) => {
  try {
    const data = await activitiesService.getAll();
    res.status(200).json({ data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll
};
