const activitiesRepository = require('../repositories/activities');

const create = async (data) => {
    return await activitiesRepository.create(data);
}

module.exports = {
    create
}