const db = require('../models');

const create = async (data) => {
    await db.Activities.create(data);
};

module.exports = {
    create
}
