const aws3 = require('../modules/s3');

const upload = async (file) => {

    var link;
    try {
        const link = await aws3(file);
        return link.Location;
    } catch (error) {
        throw error;
    }
}

module.exports = upload;