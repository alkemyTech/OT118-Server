const db = require('../models');

const create = async (data) => {
    return await db.Activities.create(data);
};

module.exports = {
    create
}
