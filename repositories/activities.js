const db = require('../models');

const create = async (data) => {
    const newActivitie = await db.Activities.create(data);
    return newActivitie;
};

module.exports = {
    create
}
