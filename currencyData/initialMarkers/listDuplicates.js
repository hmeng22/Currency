require('dotenv').config({path: './.env'});

var vuforiajs = require('vuforiajs');
var client = vuforiajs.client({'accessKey': process.env.VUFORIA_ACCESS_KEY, 'secretKey': process.env.VUFORIA_SECRET_KEY});
var util = vuforiajs.util();

var tools = require('../tools');
var log = tools.log;
var output = tools.output;
var backupFile = tools.backupFile;

var config = require('../config');
const DUPICATES_DETAILS_OUTPUT_FILE = config.duplicatedMarkersDetailsOutputFilePath;

backupFile(DUPICATES_DETAILS_OUTPUT_FILE);

client.listTargets(function(err, results) {

  if (err) {
    console.log(err)
  }

  results.results.forEach(function(target) {

    client.retrieveTarget(target, function(err, result) {
      if (err) {
        reject(err);
      } else {
        client.checkForDuplicateTargets(target, function(err, duplicates) {
          if (err) {
            reject(err);
          } else {

            var output_target = {
              name: result.target_record.name,
              // target_id: result.target_record.target_id,
              // active_flag: result.target_record.active_flag,
              tracking_rating: result.target_record.tracking_rating,
              duplicates: []
            }

            var ps = [];

            if (duplicates && duplicates.similar_targets) {
              duplicates.similar_targets.forEach(function(d) {
                var p = new Promise(function(resolve, reject) {
                  client.retrieveTarget(d, function(err, dr) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(dr);
                    }
                  });
                });

                ps.push(p);
              });
            }

            Promise.all(ps).then(function(drs) {
              drs.forEach(function(dr) {
                output_target.duplicates.push(dr.target_record.name);
              });

              output(DUPICATES_DETAILS_OUTPUT_FILE, output_target);
            });
          }
        });
      }
    });

  });

});
