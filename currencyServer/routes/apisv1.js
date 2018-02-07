var express = require('express');
var router = express.Router();

var multer = require('multer');
var multerReceiverImage = multer({
  limits: {
    // 50 * 1024 * 1024
    fileSize: 52428800
  },
  fileFilter: function(req, file, cb) {
    // console.log('Upload Image : ', file);
    if (file.mimetype != "image/jpeg") {
      cb(new Error('Please upload an Image in .jpg format.'));
    } else {
      cb(null, true);
    }
  }
});

var multerReceiverVideo = multer({
  limits: {
    // 50 * 1024 * 1024
    fileSize: 52428800
  },
  fileFilter: function(req, file, cb) {
    // console.log('Upload Audio : ', file);
    if (file.mimetype != "video/mp4") {
      cb(new Error('Please upload an Video File in .mp4 format.'));
    } else {
      cb(null, true);
    }
  }
});

router.get('/echo', function(req, res, next) {
  res.json({success: true, message: 'welcome.'})
});

// Services
var services = require('../controller/services');

router.post('/configuration', services.updateConfiguration);
router.get('/configuration', services.getConfiguration);

router.post('/syncsubscribedrates', services.syncSubscribedRates);
router.get('/iscsrates', services.iscsrates);
router.get('/subscribedics', services.subscribedics);
router.get('/subscribedic', services.subscribedic);
router.get('/ratehistory', services.rateHistory);

// System
var system = require('../controller/system');

router.post('/ratesdata', system.feedRatesdata);

router.post('/currencies', system.addCurrencies);
router.delete('/currencies', system.deleteCurrencies);
router.get('/currencies', system.getCurrencies);

router.post('/institutions', system.addInstitutions);
router.delete('/institutions', system.deleteInstitutions);
router.get('/institutions', system.getInstitutions);

router.post('/ratesheets', system.addRateSheets);
router.delete('/ratesheets', system.deleteRateSheets);
router.get('/ratesheets', system.getRateSheets);

router.post('/rates', system.addRates);
router.delete('/rates', system.deleteRates);
router.get('/rates', system.getRates);

module.exports = router;
