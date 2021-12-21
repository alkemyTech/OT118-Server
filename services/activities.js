const activitiesRepository = require('../repositories/activities')

const getAll = async () => {
    return await activitiesRepository.getAll();
}

module.exports = {
    getAll
}