const aws3 = require('../modules/s3');
const path = require('path');

const upload = async (file) => {

    try {
        const extension = (path.extname(file.name)).toLocaleLowerCase();
        const extensionsOk = ['.jpg', '.png', '.gif'];
        if (!extensionsOk.includes(extension)) {
            const error = new Error('File must be a valid image');
            error.status = 400;
            throw error;
        };

        const link = await aws3(file);
        return link.Location;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    upload
};