var program = require('commander');
var shell = require('shelljs');

program.version('0.1.0');

program.command('data').description('Process initial data from csv into json.').action(function() {
  shell.exec('node ./initialData/processInitialData.js');
});

program.command('generate').description('Generate images from source images.').action(function() {
  shell.exec('node ./initialImages/processSourceImages.js');
});

program.command('store <dir>').description('Store images.').action(function(dir) {
  shell.exec('node ./initialImages/storeImages.js ' + dir);
});

program.command('listi').description('Output stored images.').action(function() {
  shell.exec('node ./initialImages/outputStoredImages.js ');
});

program.command('cpm').description('Copy generated images as markers.').action(function() {
  shell.exec('node ./initialMarkers/copyMarkers.js');
});

program.command('marker <dir>').description('Upload images as markers.').action(function(dir) {
  shell.exec('node ./initialMarkers/storeMarkers.js ' + dir);
});

program.command('listm <dir>').description('Output markers.').action(function(dir) {
  shell.exec('node ./initialMarkers/listStoredMarkers.js ' + dir);
});

program.command('ldm').description('Output duplicated markers.').action(function() {
  shell.exec('node ./initialMarkers/listDuplicates.js');
});

program.command('db').description('Build initial database.').action(function() {
  shell.exec('node ./database/initializeDatabase.js');
});

program.command('sm').description('Build Storage Marker database.').action(function() {
  shell.exec('node ./database/buildStorageMarkerData.js');
});

program.command('elastic').description('Build elastic data.').action(function() {
  shell.exec('node ./database/outputElasticData.js');
});

program.parse(process.argv);

var recursive = require("recursive-readdir");

recursive('./', ["node_modules"], function(err, files) {
  if (err) {
    log.error("Clean Error!");
  } else {
    files.forEach(function(file) {
      if (file.endsWith('.DS_Store')) {
        console.log('Remove : ', file);
        shell.rm('-r', file);
      }
    });
  }
});
