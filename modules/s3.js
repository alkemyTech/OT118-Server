const path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk');
const { awsS3 } = require('../config/config');


const s3 = new AWS.S3({
    accessKeyId: awsS3.accessKey,
    secretAccessKey: awsS3.secretKey,
    region: awsS3.region,
});

const uploadFile = async (filename, bucketName = undefined) => {
    let fileUploaded;
    try {
        const extension = path.extname(filename).toLowerCase();
        const file = await fs.promises.readFile(path.resolve(filename));
        fileUploaded = await s3.upload(
            {
                Bucket: bucketName || awsS3.defaultBucketName,
                Key: uuidv4() + extension,
                Body: file
            }).promise();
        return fileUploaded;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    uploadFile,
}