const activitiesRepository = require('../repositories/activities');

const create = async (data) => {
    return await activitiesRepository.create(data);
}

const getAll = async () => {
    return await activitiesRepository.getAll();
}

module.exports = {
    getAll,
    create
}