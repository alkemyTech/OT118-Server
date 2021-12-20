const activitiesRepository = require('../repositories/activities')

const getAll = async () => {
    let activities = []

    let data = await activitiesRepository.getAll();
    
    data.forEach(element => {
        activities.push({
            id: element.id,
            name: element.name,
            content: element.content,
            image: element.image,
        });
    });
    return activities;
}

module.exports = {
    getAll
}