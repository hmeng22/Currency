require('dotenv').config({path: './.env'});

var AWS = require('aws-sdk');
var s3 = new AWS.S3({apiVersion: process.env.S3_API_VERSION, accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY, region: process.env.S3_REGION});

var BUCKET_NAME = process.env.S3_BUCKET_NAME;

var fs = require('fs');
var path = require('path');

var tools = require('../tools');
var log = tools.log;
var output = tools.output;
var backupFile = tools.backupFile;

var config = require('../config');
const OUTPUT_FILE = config.storedImagesOutputFilePath;

backupFile(OUTPUT_FILE);

function listAllStoredImages(ContinuationToken) {
  return new Promise(function(resolve, reject) {
    s3.listObjectsV2({
      Bucket: BUCKET_NAME,
      Prefix: config.imageFilePrefix,
      ContinuationToken: ContinuationToken
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        if (data && data.Contents) {
          data.Contents.forEach(function(item) {
            log.info('Success : ', item.Key);
            output(OUTPUT_FILE, {
              name: item.Key.substr(config.imageFilePrefix.length),
              Location: process.env.S3_URL_BASE + item.Key,
              Key: item.Key
            });
          });
        }

        if (data.IsTruncated) {
          listAllStoredImages(data.NextContinuationToken);
        } else {
          resolve();
        }
      }
    });
  });
}

listAllStoredImages().then(function() {
  log.info("Output Stored Images Done.");
}).catch(function(err) {
  log.error('Output Stored Images : ', err);
});
