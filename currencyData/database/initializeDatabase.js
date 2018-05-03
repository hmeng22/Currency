var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/cc', {useMongoClient: true});

var CountryCurrency = require('./CountryCurrency');

var tools = require('../tools');
var log = tools.log;

var config = require('../config');
const OUTPUT_FILE = config.initialDataOutputFilePath;

var jsonfile = require('jsonfile');

new Promise(function(resolve, reject) {
  jsonfile.readFile(OUTPUT_FILE, function(err, objs) {
    if (err) {
      reject(err);
    } else {
      resolve(objs);
    }
  });
}).then(function(objs) {
  return new Promise(function(resolve, reject) {
    CountryCurrency.remove({}, function(err) {
      if (err) {
        reject(err);
      }
      resolve(objs);
    });
  });
}).then(function(objs) {
  return CountryCurrency.insertMany(objs);
}).then(function(docs) {
  log.info("Insert Initial Data Count : ", docs.length);
  return Promise.resolve();
}).then(function() {
  mongoose.disconnect();
  log.info("The database connection is closed.");
}).catch(function(err) {
  log.error("Build Database Error : ", OUTPUT_FILE);
  log.error(err);
});
