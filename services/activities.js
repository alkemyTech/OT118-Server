const activitiesRepository = require('../repositories/activities');

const create = async (data) => {
    await activitiesRepository.create(data);
}

module.exports = {
    create
}