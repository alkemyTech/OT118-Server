const activitiesRepository = require("../repositories/activities");

const create = async (data) => {
  return await activitiesRepository.create(data);
};

const getAll = async () => {
  return await activitiesRepository.getAll();
};

const update = async (id, body) => {
    const activity = await activitiesRepository.getById(id);
    if (!activity) {
        const error = new Error('Activity does not exists');
        error.status = 400;
        throw error;
    } 
    
    const updateActivity = await activitiesRepository.update(id, body);
    if (updateActivity[0] === 1) {
      return await activitiesRepository.getById(id);
    }
};
 
module.exports = {
  getAll,
  create,
  update,
};
 