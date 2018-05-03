var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/cc', {useMongoClient: true});

var CountryCurrency = require('./CountryCurrency');

var tools = require('../tools');
var log = tools.log;
var selectedMarkerNameReg = tools.selectedMarkerNameReg;

var config = require('../config');
const STORED_IMAGES_OUTPUT_FILE = config.storedImagesOutputFilePath;
const STORED_MARKERS_DETAILS_OUTPUT_FILE = config.storedMarkersDetailsOutputFilePath;

var jsonfile = require('jsonfile');

new Promise(function(resolve, reject) {
  jsonfile.readFile(STORED_IMAGES_OUTPUT_FILE, function(err, objs) {
    if (err) {
      reject(err);
    } else {
      resolve(objs);
    }
  });
}).then(function(objs) {

  var ps = objs.map(function(obj) {
    if (obj.name.match(selectedMarkerNameReg)) {
      var ss = obj.name.split('_');
      var note_name = ss[0] + '_' + ss[1] + '_';

      return new Promise(function(resolve, reject) {
        CountryCurrency.findOne({
          "currency_notes.name": note_name
        }, function(err, doc) {
          if (err) {
            reject(err);
          } else {
            if (doc) {
              var notes = doc.currency_notes;
              var notes_length = notes.length;

              for (var i = 0; i < notes_length; i++) {
                if (notes[i].name === note_name) {
                  var note_storage = {
                    "storage_key": obj.Key,
                    "storage_location": obj.Location
                  }
                  if (ss[2] === 'f') {
                    notes[i].front_image.push(note_storage);
                    notes[i].markModified('front_image');
                  } else if (ss[2] === 'b') {
                    notes[i].back_image.push(note_storage);
                    notes[i].markModified('back_image');
                  } else {
                    resolve(doc);
                  }

                  doc.save(function(err, savedoc) {
                    if (err) {
                      reject(err);
                    }
                    resolve(savedoc);
                  });
                }
              }
            }
          }
        });
      });

    }
  });

  return Promise.all(ps);

}).then(function(docs) {






  return Promise.resolve();
}).then(function() {
  mongoose.disconnect();
  log.info("The database connection is closed.");
}).catch(function(err) {
  log.error("Build Database Error : ", STORED_IMAGES_OUTPUT_FILE);
  log.error(err);
});
