const Models = require('../models/index');

const getAll = async () => {
  const data = await Models.Users.findAll({
    attributes: ['firstName', 'email', 'image'],
  });
  return data;
};

const create = async (user) => {
  return await Models.Users.create(user);
};

const getById = async (id) => {
  const user = await Models.Users.findByPk(id, {
    attributes: {
      exclude: ['password'],
    },
  });
  return user;
};

const findByEmail = async (userEmail) => {
  const data = await Models.Users.findOne({
    where: { email: userEmail },
    raw: true,
  });
  return data;
};

const remove = async (id) => {
  await Models.Users.destroy({ where: { id: id } });
  return true;
};

const update = async (id, body) => {
  const userUpdate = await Models.Users.update(
    { firstName: body.firstName, lastName: body.lastName, email: body.email, image: body.image, password: body.password  },
    {
      where: {
        id: id,
      },
    }
  );
  return userUpdate;
};

module.exports = {
  getAll,
  getById,
  findByEmail,
  create,
  remove,
  update,
};
