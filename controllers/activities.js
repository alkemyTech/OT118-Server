const activitiesService = require("../services/activities");
const activitiesRepository = require("../repositories/activities");

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

  const activity = await activitiesRepository.getById(id);
  if(activity) {
    try {
      const updateActivity = await activitiesService.update(id, body);
      res.status(201).json({
        msg: `Activity with ID ${req.params.id} updated succesfully`,
        data: updateActivity,
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).json({ msg: "Activity not found"});
  }
};

module.exports = {
  getAll,
  create,
  update,
};
