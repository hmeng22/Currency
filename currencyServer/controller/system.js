var currencyStructure = require('../model/currencyStructure');
var Currency = currencyStructure.Currency;
var Rate = currencyStructure.Rate;
var RateSheet = currencyStructure.RateSheet;
var Institution = currencyStructure.Institution;

var log = require('../utils/tools').log;
var datenow = require('../utils/tools').datenow;

var system = {
  /**
  * @apiDefine ResponseJSON
  *
  * @apiSuccess {Boolean} success Specify if the request is successful.
  * @apiSuccess {String} message Message.
  * @apiSuccess {Object} error Error message when 'success' is false.
  */

  /**
  * @api {post} /v1/ratesdata Update ratesdata
  * @apiName updateRatesdata
  * @apiGroup RatesData
  *
  * @apiDescription Update ratesdata.
  *
  * @apiUse ResponseJSON
  */
  // 参数: Rates, Institution, date
  // 1. 查找Institution
  // 2. 查找RatesSheet，如果没有新建当天日期并保存到Institution
  // 3. 保存Rates，并保存到RatesSheet
  // 4. 完成
  feedRatesdata(req, res) {
    var rates = req.body.rates || req.query.rates || '';
    var institution_swift = req.body.institution_swift || req.query.institution_swift || '';
    var date = req.body.date || req.query.date || datenow();

    Institution.findOne({
      swift: institution_swift
    }, (err, institution) => {
      if (err) {
        log.error('feedRatesdata() : Error : ', err);
        res.json({success: false, message: 'Cannot find the Institution.', error: err});
      } else {
        if (!institution) {
          log.info('feedRatesdata() : Cannot find the Institution.');
          res.json({success: false, message: 'Cannot find the Institution.', error: err});
        } else {
          log.info('feedRatesdata() : Find the Institution successfully.');

          RateSheet.findOne({
            institutionSWIFT: institution_swift,
            date: date
          }, (err, ratesheet) => {
            if (err) {
              log.error('feedRatesdata() : Error : ', err);
              res.json({success: false, message: 'Cannot find the Rate Sheet.', error: err});
            } else {
              if (!ratesheet) {
                ratesheet = new RateSheet({institutionSWIFT: institution_swift, date: date, rates: []});
                ratesheet.save((err) => {
                  if (err) {
                    log.error('feedRatesdata() : Error : ', err);
                    res.json({success: false, message: 'Cannot save the new Rate Sheet.', error: err});
                  } else {
                    institution.update({
                      $push: {
                        ratehistory: ratesheet
                      }
                    }, {
                      upsert: true
                    }, (err) => {
                      if (err) {
                        log.error('feedRatesdata() : Error : ', err);
                        res.json({success: false, message: 'Cannot save the new Rate Sheet into institution.', error: err});
                      }
                    });
                  }
                })
              }

              Rate.insertMany(rates, (err, newrates) => {
                ratesheet.update({
                  $pushAll: {
                    rates: newrates
                  }
                }, {
                  safe: true,
                  upsert: true
                }, function(err) {
                  if (err) {
                    log.error('feedRatesdata() : Error : ', err);
                    res.json({success: false, message: 'Cannot save the Rates.', error: err});
                  } else {
                    log.info('feedRatesdata() : Feed rates data successfully.');
                    res.json({success: true, message: 'Feed rates data successfully.'});
                  }
                });
              });
            }
          });
        }
      }
    });
  },

  /**
  * @api {post} /v1/currencies Add currencies
  * @apiName addCurrencies
  * @apiGroup Currency
  *
  * @apiDescription Add currencies.
  *
  * @apiUse ResponseJSON
  */
  addCurrencies(req, res) {
    var currencies = req.body.currencies || req.query.currencies || '';

    Currency.insertMany(currencies, (err, docs) => {
      if (err) {
        log.error('addCurrencies() : Error : ', err);
        res.json({success: false, message: 'Cannot add currencies.', error: err});
      } else {
        log.info('addCurrencies() : Add currencies successfully.');
        res.json({success: true, message: 'Add currencies successfully.'});
      }
    });
  },

  /**
  * @api {delete} /v1/currencies Delete currencies
  * @apiName deleteCurrencies
  * @apiGroup Currency
  *
  * @apiDescription Delete currencies.
  *
  * @apiUse ResponseJSON
  */
  deleteCurrencies(req, res) {
    var codes = req.body.codes || req.query.codes || '';

    Currency.remove({
      code: {
        $in: codes
      }
    }, (err) => {
      if (err) {
        log.error('deleteCurrencies() : Error : ', err);
        res.json({success: false, message: 'Cannot delete currencies.', error: err});
      } else {
        log.info('deleteCurrencies() : Delete currencies successfully.');
        res.json({success: true, message: 'Delete currencies successfully.'});
      }
    });
  },

  /**
  * @api {get} /v1/currencies Get currencies
  * @apiName getCurrencies
  * @apiGroup Currency
  *
  * @apiDescription Get all currencies.
  *
  * @apiUse ResponseJSON
  */
  getCurrencies(req, res) {
    Currency.find().exec((err, cs) => {
      if (err) {
        log.error('getCurrencies() : Error : ', err);
        res.json({success: false, message: 'Cannot get currencies.', error: err});
      } else {
        log.info('getCurrencies() : Get currencies successfully.');
        res.json({success: true, message: 'Get currencies successfully.', currencies: cs});
      }
    });
  },

  /**
  * @api {post} /v1/institutions Add institutions
  * @apiName addInstitutions
  * @apiGroup Institution
  *
  * @apiDescription Add institutions.
  *
  * @apiUse ResponseJSON
  */
  addInstitutions(req, res) {
    var institutions = req.body.institutions || req.query.institutions || '';

    Institution.insertMany(institutions, (err, docs) => {
      if (err) {
        log.error('addInstitutions() : Error : ', err);
        res.json({success: false, message: 'Cannot add institutions.', error: err});
      } else {
        log.info('addInstitutions() : Add institutions successfully.');
        res.json({success: true, message: 'Add institutions successfully.'});
      }
    });
  },

  /**
  * @api {delete} /v1/institutions Delete institutions
  * @apiName deleteInstitutions
  * @apiGroup Institution
  *
  * @apiDescription Delete institutions.
  *
  * @apiUse ResponseJSON
  */
  deleteInstitutions(req, res) {
    var institution_swifts = req.body.institution_swifts || req.query.institution_swifts || '';

    Institution.remove({
      swift: {
        $in: institution_swifts
      }
    }, (err) => {
      if (err) {
        log.error('deleteInstitutions() : Error : ', err);
        res.json({success: false, message: 'Cannot delete institutions.', error: err});
      } else {
        log.info('deleteInstitutions() : Delete institutions successfully.');
        res.json({success: true, message: 'Delete institutions successfully.'});
      }
    });
  },

  /**
  * @api {get} /v1/institutions Get institutions
  * @apiName getInstitutions
  * @apiGroup Institution
  *
  * @apiDescription Get all institutions.
  *
  * @apiUse ResponseJSON
  */
  getInstitutions(req, res) {
    Institution.find().exec((err, is) => {
      if (err) {
        log.error('getInstitutions() : Error : ', err);
        res.json({success: false, message: 'Cannot get institutions.', error: err});
      } else {
        log.info('getInstitutions() : Get institutions successfully.');
        res.json({success: true, message: 'Get institutions successfully.', institutions: is});
      }
    });
  },

  /**
  * @api {post} /v1/ratesheets Add ratesheets
  * @apiName addRatesheets
  * @apiGroup Ratesheet
  *
  * @apiDescription Add ratesheets.
  *
  * @apiUse ResponseJSON
  */
  addRateSheets(req, res) {
    var ratesheets = req.body.ratesheets || req.query.ratesheets || '';

    RateSheet.insertMany(ratesheets, (err, rss) => {
      if (err) {
        log.error('addRateSheets() : Error : ', err);
        res.json({success: false, message: 'Cannot add ratesheets.', error: err});
      } else {
        log.info('addRateSheets() : Add ratesheets successfully.');

        rss.forEach((rs) => {
          Institution.findOneAndUpdate({
            swift: rs.institutionSWIFT
          }, {
            $push: {
              ratehistory: rs
            }
          }, {
            upsert: true
          }, (err) => {
            if (err) {
              log.error('addRateSheets() : Error : ', err);
              res.json({success: false, message: 'Cannot add ratesheets.', error: err});
            }
          });
        });

        log.info('addRateSheets() : Add ratesheets into the Institution successfully.');
        res.json({success: true, message: 'Add ratesheets into the Institution successfully.', ratesheets: rss});
      }
    });
  },

  /**
  * @api {delete} /v1/ratesheets Delete ratesheets
  * @apiName deleteRatesheets
  * @apiGroup Ratesheets
  *
  * @apiDescription Delete ratesheets.
  *
  * @apiUse ResponseJSON
  */
  deleteRateSheets(req, res) {
    var institution_swift = req.body.institution_swift || req.query.institution_swift || '';
    var rate_date = req.body.rate_date || req.query.rate_date || '';

    RateSheet.findOneAndUpdate({
      institutionSWIFT: institution_swift,
      date: rate_date
    }, {
      $set: {
        available: false
      }
    }, (err, rs) => {
      if (err) {
        log.error('deleteRateSheets() : Error : ', err);
        res.json({success: false, message: 'Cannot delete ratesheets.', error: err});
      } else {
        Rate.update({
          institutionSWIFT: institution_swift,
          date: rate_date
        }, {
          $set: {
            available: false
          }
        }, (err) => {
          if (err) {
            log.error('deleteRateSheets() : Error : ', err);
            res.json({success: false, message: 'Cannot delete rates.', error: err});
          } else {
            Institution.findOneAndUpdate({
              swift: institution_swift
            }, {
              $pull: {
                ratehistory: rs._id
              }
            }, (err) => {
              if (err) {
                log.error('deleteRateSheets() : Error : ', err);
                res.json({success: false, message: 'Cannot delete ratesheets from Institution.', error: err});
              } else {
                log.info('deleteRateSheets() : Add ratesheets into the Institution successfully.');
                res.json({success: true, message: 'Delete ratesheets successfully.'});
              }
            });
          }
        });
      }
    });
  },

  /**
  * @api {get} /v1/ratesheets Get ratesheets
  * @apiName getRatesheets
  * @apiGroup Ratesheets
  *
  * @apiDescription Get all ratesheets.
  *
  * @apiUse ResponseJSON
  */
  getRateSheets(req, res) {
    var institution_swift = req.query.institution_swift || '';

    RateSheet.find({
      institutionSWIFT: institution_swift,
      available: true
    }, '-available').exec((err, rss) => {
      if (err) {
        log.error('getRateSheets() : Error : ', err);
        res.json({success: false, message: 'Cannot get ratesheets.', error: err});
      } else {
        log.info('getRateSheets() : Get ratesheets successfully.');
        res.json({success: true, message: 'Get ratesheets successfully.', ratesheets: rss});
      }
    })
  },

  /**
  * @api {post} /v1/rates Add rates
  * @apiName addRates
  * @apiGroup Rate
  *
  * @apiDescription Add rates.
  *
  * @apiUse ResponseJSON
  */
  addRates(req, res) {
    var rates = req.body.rates || req.query.rates || '';
    var institution_swift = req.body.institution_swift || req.query.institution_swift || '';
    var rate_date = req.body.rate_date || req.query.rate_date || '';

    Rate.insertMany(rates, (err, rs) => {
      if (err) {
        log.error('addRates() : Error : ', err);
        res.json({success: false, message: 'Cannot add rates.', error: err});
      } else {
        RateSheet.findOneAndUpdate({
          institutionSWIFT: institution_swift,
          date: rate_date
        }, {
          $pushAll: {
            rates: rs
          }
        }, {
          upsert: true
        }, (err) => {
          if (err) {
            log.error('addRateSheets() : Error : ', err);
            res.json({success: false, message: 'Cannot add ratesheets.', error: err});
          } else {
            log.info('addRates() : Add rates successfully.');
            res.json({success: true, message: 'Add rates successfully.'});
          }
        });
      }
    });
  },

  /**
  * @api {delete} /v1/rates Delete rates
  * @apiName deleteRates
  * @apiGroup Rate
  *
  * @apiDescription Delete rates.
  *
  * @apiUse ResponseJSON
  */
  deleteRates(req, res) {
    var institution_swift = req.body.institution_swift || req.query.institution_swift || '';
    var rate_date = req.body.rate_date || req.query.rate_date || '';
    var rate_time = req.body.rate_time || req.query.rate_time || '';

    Rate.find({
      institutionSWIFT: institution_swift,
      date: rate_date,
      time: rate_time
    }, (err, rates) => {
      if (err) {
        log.error('deleteRates() : Error : ', err);
        res.json({success: false, message: 'Cannot find rates.', error: err});
      } else {
        rates.forEach((rate) => {
          rate.update({
            available: false
          }, (err, r) => {
            if (err) {
              log.error('deleteRates() : Error : ', err);
              res.json({success: false, message: 'Cannot delete rates.', error: err});
            }
          })
        });

        RateSheet.findOneAndUpdate({
          institutionSWIFT: institution_swift,
          date: rate_date
        }, {
          $pullAll: {
            rates: rates
          }
        }, (err) => {
          if (err) {
            log.error('deleteRates() : Error : ', err);
            res.json({success: false, message: 'Cannot delete rates.', error: err});
          } else {
            log.info('deleteRates() : Delete rates successfully.');
            res.json({success: true, message: 'Delete rates successfully.'});
          }
        });

      }
    });
  },

  /**
  * @api {get} /v1/rates Get rates
  * @apiName getRates
  * @apiGroup Rates
  *
  * @apiDescription Get all rates.
  *
  * @apiUse ResponseJSON
  */
  getRates(req, res) {
    var institution_swift = req.query.institution_swift || '';
    var rate_date = req.query.rate_date || '';

    Rate.find({
      institutionSWIFT: institution_swift,
      date: rate_date,
      available: true
    }, '-available').exec((err, rs) => {
      if (err) {
        log.error('getRates() : Error : ', err);
        res.json({success: false, message: 'Cannot get rates.', error: err});
      } else {
        log.info('getRates() : Get rates successfully.');
        res.json({success: true, message: 'Get rates successfully.', rates: rs});
      }
    })
  }
}

module.exports = system
