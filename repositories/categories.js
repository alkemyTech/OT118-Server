const db = require('../models');

/**
 * @swagger
 * components:
 *  schemas:
 *      Categories:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the category name
 *              description:
 *                  type: string
 *                  description: the category description
 *              image:
 *                  type: string
 *                  description: the category image
 *          required:
 *              - name
 *          example:
 *              name: Kevin McKallister
 */

const create = async (body) => {
  return await db.Categories.create(body);
};

const update = async (id, body) => {
  return await db.Categories.update(body, { where: { id },});
}

const getAll = async () => {
  const data = await db.Categories.findAll({
    attributes: ['name'],
    });
  return data;
};

const getById = async (id) => {
  return await db.Categories.findByPk(id, {
    "attributes": { exclude: ['deletedAt'] }
  });
};

const remove = async (id) => {
  await db.Categories.destroy({ where: { id } });
};

const getByName = async (name) => {
  return await db.Categories.findOne({ where: { name } });
};

module.exports = {
  getByName,
  create,
  update,
  getAll,
  getById,
  remove
};
