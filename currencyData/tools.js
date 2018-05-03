var fs = require('fs');
var shell = require('shelljs');
var moment = require('moment');
var dtname = moment().format("YYYYMMDDHHmmssSS");
var config = require('./config');

var winston = require('winston');
var log = new(winston.Logger)({
  level: 'info',
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
    record: 8
  },
  transports: [
    new(winston.transports.Console)({prettyPrint: true, colorize: true}),
    new(winston.transports.File)({name: 'info-file', filename: config.infoLogPath, level: 'info'}),
    new(winston.transports.File)({name: 'error-file', filename: config.errorLogPath, level: 'error'}),
    new(winston.transports.File)({name: 'record-file', filename: config.recordLogPath, level: 'record'})
  ],
  exitOnError: false
});

var backupFile = function(fileName) {
  if (fs.existsSync(fileName)) {
    shell.mv(fileName, fileName + '-' + dtname);
  }
}

var jsonfile = require('jsonfile');
var output = function(fileName, contents) {
  jsonfile.writeFileSync(fileName, contents, {
    flag: 'a',
    EOL: ',\r\n'
  }, function(err) {
    log.error("output Error : ", err);
  })
}

// country_value_frontOrBack_series_size.jpg
// us_100_f_2004_o.jpg
var sourceImageNameReg = /^.{2}_\d+_[f|b]_\d+_o.(jpg|JPG)$/;
var selectedMarkerNameReg = /^.{2}_\d+_[f|b]_\d+_o_2048.(jpg|JPG)$/;

module.exports = {
  log: log,
  output: output,
  sourceImageNameReg: sourceImageNameReg,
  selectedMarkerNameReg: selectedMarkerNameReg,
  backupFile: backupFile
}
