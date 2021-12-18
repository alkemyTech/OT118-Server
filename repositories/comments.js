const db = require('../models');
const { validationResult } = require('express-validator');

const remove = async (id) => {
  await db.Comments.destroy({ where: { id } });
};

const create = async(body) => {
  const errors = validationResult(body)
  if(errors.isEmpty()){
    await db.Comments.create({
      user_id: body.user_id,
      novelty_id: body.novelty_id,
      body: body.body,
      createAt: new Date()
    })
  }
}

module.exports = {
  remove,
  create
};
