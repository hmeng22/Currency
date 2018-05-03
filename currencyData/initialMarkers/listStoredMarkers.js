require('dotenv').config({path: './.env'});

var vuforiajs = require('vuforiajs');
var client = vuforiajs.client({'accessKey': process.env.VUFORIA_ACCESS_KEY, 'secretKey': process.env.VUFORIA_SECRET_KEY});
var util = vuforiajs.util();

var fs = require('fs');

var tools = require('../tools');
var log = tools.log;
var output = tools.output;
var backupFile = tools.backupFile;

var OUTPUT_FILE_PATH = process.argv[2];

if (!OUTPUT_FILE_PATH || !fs.existsSync(OUTPUT_FILE_PATH)) {
  log.info("The path is invalid.");
  process.exit(1);
}

var config = require('../config');
const DETAILS_OUTPUT_FILE = config.storedMarkersDetailsOutputFilePath;

backupFile(DETAILS_OUTPUT_FILE);

var jsonfile = require('jsonfile');
jsonfile.readFile(OUTPUT_FILE_PATH, function(err, objs) {
  if (err) {
    log.error('Read Markers File Error : ', err);
  } else {
    objs.forEach(function(obj) {
      client.retrieveTarget(obj.target_id, function(err, result) {
        if (err) {
          log.error('Retrieve Marker Error : ', obj.name);
        } else {
          client.checkForDuplicateTargets(obj.target_id, function(err, duplicates) {
            if (err) {
              log.error('Check Duplicates Error : ', obj.name);
            } else {
              log.info('Success : ', obj.name);
              output(DETAILS_OUTPUT_FILE, {
                name: obj.name,
                target_id: result.target_record.target_id,
                active_flag: result.target_record.active_flag,
                tracking_rating: result.target_record.tracking_rating,
                duplicates: duplicates.similar_targets
              });
            }
          });
        }
      });
    });
  }
});
