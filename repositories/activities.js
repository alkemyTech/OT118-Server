const db = require('../models');

const getAll = async () => {
    return await db.Activities.findAll();
  }

module.exports = {
    getAll
}