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

var IMAGES_DIRECTORY = process.argv[2];

if (!IMAGES_DIRECTORY || !fs.existsSync(IMAGES_DIRECTORY)) {
  log.info("The path is invalid.");
  process.exit(1);
}

var config = require('../config');
const OUTPUT_FILE = config.storedImagesOutputFilePath;

backupFile(OUTPUT_FILE);

var recursive = require("recursive-readdir");

recursive(IMAGES_DIRECTORY, [".*"], function(err, files) {
  if (err) {
    log.error("Images Directory Error : ", IMAGES_DIRECTORY);
  } else {
    files.forEach(function(file) {
      var filename = path.basename(file);

      fs.readFile(file, function(err, buffer) {
        if (err) {
          log.error('Read File Error : ', file, err);
        } else {
          var params = {
            Bucket: BUCKET_NAME,
            Key: config.imageFilePrefix + filename,
            Body: buffer,
            ContentType: 'image/jpeg'
          };
          s3.upload(params, function(err, data) {
            if (err) {
              log.error('Upload Image Error : ', file, err);
            } else {
              log.info('Success : ', file);
              output(OUTPUT_FILE, {
                name: filename,
                Location: data.Location,
                Key: data.Key
              });
            }
          });
        }
      });
    });
  }
});
