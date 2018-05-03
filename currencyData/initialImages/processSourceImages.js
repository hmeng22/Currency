var fs = require('fs');
var path = require('path');

var shell = require('shelljs');
var Jimp = require('jimp');
var sharp = require('sharp');

var tools = require('../tools');
var log = tools.log;
var sourceImageNameReg = tools.sourceImageNameReg;

var config = require('../config');
const SOURCE_IMAGES_DIRECTORY = config.sourceImagesDirectory;
const GENERATED_IMAGES_DIRECTORY = config.generatedImagesDirectory;
const GENERATED_IMAGE_WIDTHS = config.generatedImageWidths;
const MAX_IMAGE_WIDTH = Math.max(...GENERATED_IMAGE_WIDTHS);

var recursive = require("recursive-readdir");

var flag = true;

recursive(SOURCE_IMAGES_DIRECTORY, [".*"], function(err, files) {
  if (err) {
    log.error("Check Source Images Error : ", SOURCE_IMAGES_DIRECTORY);
  } else {
    files.forEach(function(file) {
      if (path.basename(file).match(sourceImageNameReg)) {
        log.info("Valid : ", file);
      } else {
        flag = false;
        log.error("Invalid : Name-invalid", file);
      }

      sharp(file).metadata().then(function(metadata) {
        if (metadata.width < MAX_IMAGE_WIDTH) {
          log.error("Invalid : Low-res", file, " --- Width : ", metadata.width);
        }
      });

      // Jimp.read(file).then(function(image) {
      //   if (image.bitmap.width < MAX_IMAGE_WIDTH) {
      //     log.error("Invalid : Low-res", file, " --- Width : ", image.bitmap.width);
      //   }
      // });
    });

    log.info("-------------------------");
    log.info("Check Source Images Done.");
    log.info("-------------------------");
    if (!flag) {
      log.error("Some images are invalid. Please check logs.");
      process.exit(1);
    } else {
      generateImages();
    }
  }
});

function generateImages() {

  if (!fs.existsSync(GENERATED_IMAGES_DIRECTORY)) {
    shell.mkdir('-p', GENERATED_IMAGES_DIRECTORY);
  }
  log.info('Output Folder Path : >>>', GENERATED_IMAGES_DIRECTORY, '<<<');
  log.info('Maximum Image Size : >>>', MAX_IMAGE_WIDTH, '<<<');

  recursive(SOURCE_IMAGES_DIRECTORY, [".*"], function(err, files) {
    if (err) {
      log.error("Generate Images Error : ", SOURCE_IMAGES_DIRECTORY);
    } else {
      files.forEach(function(file) {
        GENERATED_IMAGE_WIDTHS.forEach(function(IMAGE_WIDTH) {
          var output_file_name = GENERATED_IMAGES_DIRECTORY + "/" + path.parse(file).name + "_" + IMAGE_WIDTH.toString() + ".jpg";

          sharp(file).resize(IMAGE_WIDTH).toFile(output_file_name, function(err, info) {
            if (err) {
              log.error("Resize Image Error : ", file, IMAGE_WIDTH, err);
            } else {
              log.info("Success : ", output_file_name);
            }
          });

          // Jimp.read(file).then(function(image) {
          //   image.resize(IMAGE_WIDTH, Jimp.AUTO).quality(100).write(output_file_name);
          //   log.info("Success : ", output_file_name);
          // }).catch(function(err) {
          //   log.error("Resize Image Error : ", file, IMAGE_WIDTH, err);
          // });
        });
      });

      log.info("Processing Images ...");
    }
  });
}
