const activitiesRepository = require('../repositories/activities')

const getAll = async () => {
    let activities = []

    const data = await activitiesRepository.getAll();
    activities.push(data);

    return activities;
}

module.exports = {
    getAll
}