const activitiesRepository = require('../repositories/activities');

const create = async (data) => {
    const newActivitie = await activitiesRepository.create(data);
    return newActivitie;
}

module.exports = {
    create
}