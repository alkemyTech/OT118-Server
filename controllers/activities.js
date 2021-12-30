const activitiesService = require("../services/activities");

const create = async (req, res, next) => {
  try {
    const newActivity = await activitiesService.create(req.body);
    res.status(201).json({
      msg: `Activity created succesfully`,
      data: newActivity,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await activitiesService.getAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updateActivity = await activitiesService.update(id, body);
    res.status(201).json({
      msg: `Activity with ID ${req.params.id} updated succesfully`,
      data: updateActivity,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update,
};
