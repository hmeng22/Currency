require('dotenv').config({path: './.env'});

var vuforiajs = require('vuforiajs');
var client = vuforiajs.client({'accessKey': process.env.VUFORIA_ACCESS_KEY, 'secretKey': process.env.VUFORIA_SECRET_KEY});
var util = vuforiajs.util();

var fs = require('fs');
var path = require('path');

var tools = require('../tools');
var log = tools.log;
var output = tools.output;
var backupFile = tools.backupFile;

var MARKERS_DIRECTORY = process.argv[2];

if (!MARKERS_DIRECTORY || !fs.existsSync(MARKERS_DIRECTORY)) {
  log.info("The path is invalid.");
  process.exit(1);
}

var shell = require('shelljs');
var moment = require('moment');
var dtname = moment().format("YYYYMMDDHHmmssSS");

var UPLOADED_DIRECTORY = path.resolve(__dirname, dtname);
shell.mkdir('-p', UPLOADED_DIRECTORY);

var config = require('../config');
const OUTPUT_FILE = config.storedMarkersOutputFilePath;

backupFile(OUTPUT_FILE);

var recursive = require("recursive-readdir");

recursive(MARKERS_DIRECTORY, [".*"], function(err, files) {
  if (err) {
    log.error("Images Directory Error : ", MARKERS_DIRECTORY);
  } else {
    files.forEach(function(file) {
      var filename = path.basename(file);
      var target = {
        'name': filename,
        'width': 1.0,
        'image': util.encodeFileBase64(file),
        'active_flag': true,
        'application_metadata': util.encodeBase64(filename)
      };
      client.addTarget(target, function(err, result) {
        if (err) {
          log.error('Upload Marker Error : ', file, err);
        } else {
          log.info('Success : ', file);
          output(OUTPUT_FILE, {
            name: filename,
            target_id: result.target_id
          });
          shell.mv(file, UPLOADED_DIRECTORY);
        }
      });
    });

    log.warning("Please wait until all markers are processed by Vuforia.");
    log.info("Log >>> ", OUTPUT_FILE);
  }
});
