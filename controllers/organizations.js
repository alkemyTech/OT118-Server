const organizationService = require('../services/organizations');
const configuration = require('../config/config');

const update = async (req, res, next) => {
  try {
    const id = configuration.organizationId;
    const data = await organizationService.update(id, req.body);
    res.status(200).json({
      msg: `Member updated successfully`,
      data: data,
    });
  }
  catch (e) {
    next(e);
  }
};

const getPublicInfo = async (req, res, next) => {
  const data = await organizationService.getPublicInfo(configuration.organizationId);
  res.status(200).json({ data })
}

module.exports = {
  update,
  getPublicInfo
};
