const activitiesRepository = require('../repositories/activities');

const create = async (data) => {
    return await activitiesRepository.create(data);
}

const getAll = async () => {
    return await activitiesRepository.getAll();
}

const update = async (id, body) => {
    const updateActivity = await activitiesRepository.update(id, body);
    if(updateActivity[0] === 1) {
        return await activitiesRepository.getById(id)
    }
}

module.exports = {
    getAll,
    create,
    update
}