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

const uploadToBucket = async (file) => {
    let uploadedFile;
    try {
        const stream = fs.createReadStream(file.tempFilePath);
        const extension = path.extname(file.name).toLowerCase();
        uploadedFile = await s3.upload(
            {
                Bucket: awsS3.bucketName,
                Key: uuidv4() + extension,
                Body: stream,
                ContentType: file.mimetype || 'image/jpeg',
                ACL: "public-read"
            }).promise();
        return uploadedFile;
    } catch (err) {
        throw err;
    }
};

module.exports = {uploadToBucket}