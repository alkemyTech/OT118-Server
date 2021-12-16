const organizationService = require('../services/organizations');
const configuration = require('../config/config');

const update = async (req, res, next) => {
  try {
    const id = configuration.organizationId;
    const data = await organizationService.update(id, req.body);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  update
};
