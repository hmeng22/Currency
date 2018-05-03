var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

var tools = require('../tools');
var log = tools.log;
var selectedMarkerNameReg = tools.selectedMarkerNameReg;

var config = require('../config');
const GENERATED_IMAGES_DIRECTORY = config.generatedImagesDirectory;

var SELECTED_MARKERS = path.resolve(__dirname, 'selectedMarkers');

if (!SELECTED_MARKERS || !fs.existsSync(SELECTED_MARKERS)) {
  shell.mkdir('-p', SELECTED_MARKERS);
}

var copied_images_count = 0;

var recursive = require("recursive-readdir");

recursive(GENERATED_IMAGES_DIRECTORY, [".*"], function(err, files) {
  if (err) {
    log.error("Images Directory Error : ", GENERATED_IMAGES_DIRECTORY);
  } else {
    files.forEach(function(file) {
      var filename = path.basename(file);

      if (filename.match(selectedMarkerNameReg)) {
        copied_images_count++;
        shell.cp(file, SELECTED_MARKERS + '/' + filename);
      }
    });

    console.log("Markers Count : ", copied_images_count);
  }
});
