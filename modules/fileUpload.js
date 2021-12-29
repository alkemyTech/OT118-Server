const {aws3} = require('../modules/s3');

const upload = async (req) => {
    const file = req.files.file;

    var link;
    try {
        const link = await aws3.uploadToBucket(file);
        return link.Location;
    } catch (error) {
        throw error;
    }
}

module.exports = upload;