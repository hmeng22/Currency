var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var moment = require('moment');
var dtname = moment().format("YYYYMMDDHHmmssSS");

var outputDirectory = path.resolve(__dirname, 'outputs');
var logDirectory = path.resolve(__dirname, 'logs');

if (!fs.existsSync(outputDirectory)) {
  shell.mkdir('-p', outputDirectory);
}

if (!fs.existsSync(logDirectory)) {
  shell.mkdir('-p', logDirectory);
}

module.exports = {
  // database
  outputDirectory: outputDirectory,

  // initialData
  initialDataCSVFilePath: path.resolve(__dirname, 'initialData', 'countryCurrency') + '/CountryCurrency-Country&Currency.csv',
  initialDataOutputFilePath: outputDirectory + '/initialData-file.json',
  initialDataOutputElasticPath: outputDirectory + '/initialData-elastic.json',

  // images
  sourceImagesDirectory: path.resolve(__dirname, 'initialImages', 'sourceImages'),
  generatedImagesDirectory: path.resolve(__dirname, 'initialImages', 'generatedImages'),
  generatedImageWidths: [
    2048, 1024, 512
  ],

  imageFilePrefix: "cc-",
  storedImagesOutputFilePath: outputDirectory + '/storedImages-file.json',

  storedMarkersOutputFilePath: outputDirectory + '/storedMarkers-file.json',
  storedMarkersDetailsOutputFilePath: outputDirectory + '/storedMarkers-details-file.json',
  duplicatedMarkersDetailsOutputFilePath : outputDirectory + '/duplicatedMarkers-details-file.json',

  // elastic search
  elasticIndex: "countrycurrency",
  elasticType: "cc",

  // logs
  logDirectory: logDirectory,
  infoLogPath: logDirectory + '/info-' + dtname + '.log',
  errorLogPath: logDirectory + '/error-' + dtname + '.log',
  recordLogPath: logDirectory + '/record-' + dtname + '.log'
}
