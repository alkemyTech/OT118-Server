const aws3 = require("../modules/s3");
const path = require("path");
const createError = require("http-errors");

const upload = async (file) => {
  try {
    const extension = path.extname(file.name).toLocaleLowerCase();
    const extensionsOk = [".jpg", ".png", ".gif"];
    if (!extensionsOk.includes(extension))
      throw createError(400, { msg: "File must be a valid image" });
    const link = await aws3.uploadToBucket(file);
    return link.Location;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  upload,
};
