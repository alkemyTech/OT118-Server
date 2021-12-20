const db = require('../models');

const getAll = async () => {
    const data = await db.Activities.findAll();
    return data;
  }

module.exports = {
    getAll
}