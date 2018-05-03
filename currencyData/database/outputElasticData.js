require('dotenv').config({path: './.env'});

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/cc', {useMongoClient: true});

var CountryCurrency = require('./CountryCurrency');

var fs = require('fs');

var tools = require('../tools');
var log = tools.log;
var output = tools.output;
var backupFile = tools.backupFile;

var axios = require('axios');
axios.defaults.baseURL = process.env.ELASTIC_URL;

var config = require('../config');
const OUTPUT_ELASTIC = config.initialDataOutputElasticPath;
const ELASTIC_INDEX = config.elasticIndex;
const ELASTIC_TYPE = config.elasticType;

backupFile(OUTPUT_ELASTIC);

CountryCurrency.find({}, '-_id -__v -currency_coins._id -currency_notes._id').then(function(docs) {
  docs.forEach(function(doc) {

    output(OUTPUT_ELASTIC, {
      "index": {
        "_index": ELASTIC_INDEX,
        "_type": ELASTIC_TYPE
      }
    });
    output(OUTPUT_ELASTIC, doc);
  });

  log.info("Output Elastic Data Count : ", docs.length);
  return Promise.resolve();
}).then(function() {
  return mongoose.disconnect();
}).then(function() {
  log.info("The database connection is closed.");

  return axios.get('/_cat/indices?format=json&pretty');

}).then(function(response) {
  response.data.forEach(function(d) {
    if (d.index === config.elasticIndex) {
      return axios.delete('/' + config.elasticIndex);
    }
  });

  return Promise.resolve();
}).then(function() {

  fs.readFile(OUTPUT_ELASTIC, function(err, buffer) {
    if (err) {
      return Promise.reject(err);
    } else {
      return axios.post('/_bulk', buffer, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  });
}).then(function() {
  log.info("Build Elastic Done.");

}).catch(function(err) {
  log.error("Output Elastic Error : ", err);
})
