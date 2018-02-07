var async = require('async');

var User = require('../model/user');
var currencyStructure = require('../model/currencyStructure');
var Currency = currencyStructure.Currency;
var Rate = currencyStructure.Rate;
var RateSheet = currencyStructure.RateSheet;
var Institution = currencyStructure.Institution;

var moment = require('moment');

var log = require('../utils/tools').log;

var services = {
  /**
  * @apiDefine ResponseJSON
  *
  * @apiSuccess {Boolean} success Specify if the request is successful.
  * @apiSuccess {String} message Message.
  * @apiSuccess {Object} error Error message when 'success' is false.
  */

  /**
  * @api {post} /v1/configuration Update configuration
  * @apiName updateConfiguration
  * @apiGroup Services
  *
  * @apiDescription Update configuration.
  *
  * @apiUse ResponseJSON
  */
  updateConfiguration(req, res) {
    var user_id = req.user.user_id || '';
    var userconf = req.body.userconf || req.query.userconf || '';
    var subscribedIC = req.body.subscribedIC || req.query.subscribedIC || '';

    User.findById(user_id).exec((err, u) => {
      if (err) {
        log.error('updateConfiguration() : Find the user Error : ', err);
        res.json({success: false, message: 'Cannot find the user.', error: err});
      } else {
        if (!u) {
          log.error("updateConfiguration() : Cannot find the user.");
          res.json({success: false, message: 'The user is not found.'});
        } else {
          if (userconf) {
            log.info("updateConfiguration() : userconf : ", userconf)
            console.log("updateConfiguration() : userconf : ", userconf);
          }
          if (subscribedIC) {
            u.subscribedIC = subscribedIC;
            u.markModified('subscribedIC');
            u.save((err) => {
              if (err) {
                log.error('updateConfiguration() : Update configuration Error : ', err);
                res.json({success: false, message: 'Cannot update the configuration.', error: err});
              }
            });
          }
          log.info("updateConfiguration() : Update the configuration successfully.");
          res.json({success: true, message: 'Update configuration info successfully.'});
        }
      }
    });
  },

  /**
  * @api {get} /v1/configuration Get configuration
  * @apiName getConfiguration
  * @apiGroup Services
  *
  * @apiDescription Get configuration.
  *
  * @apiUse ResponseJSON
  */
  getConfiguration(req, res) {
    var user_id = req.user.user_id || '';

    User.findById(user_id, 'email username subscribedIC userconf').exec((err, u) => {
      if (err) {
        log.error('getConfiguration() : Find the user Error : ', err);
        res.json({success: false, message: 'Cannot find the user.', error: err});
      } else {
        if (!u) {
          log.error("getConfiguration() : Cannot find the user.");
          res.json({success: false, message: 'The user is not found.'});
        } else {
          Institution.find({}, '-_id country name alias swift basecurrencycodes foreigncurrenycodes').exec((err, is) => {
            if (err) {
              log.error('getConfiguration() : Find the user Error : ', err);
              res.json({success: false, message: 'Cannot find the user.', error: err});
            } else {
              Currency.find({}, '-_id name code codenumber institutionSWIFT').exec((err, cs) => {
                if (err) {
                  log.error('getConfiguration() : Find the user Error : ', err);
                  res.json({success: false, message: 'Cannot find the user.', error: err});
                } else {
                  console.log(u);
                  var userconf = {
                    email: u.email,
                    username: u.username,
                    rates_limit: u.userconf.rates_limit,
                    rates_interval: u.userconf.rates_interval
                  };
                  var configuration = {
                    userconf: userconf,
                    institutions: is,
                    currencies: cs,
                    subscribedIC: u.subscribedIC
                  };
                  log.info("getConfiguration() : Find the user successfully.");
                  res.json({success: true, message: 'Get configuration info successfully.', configuration: configuration});
                }
              });
            }
          });
        }
      }
    });
  },

  /**
  * @api {post} /v1/syncsubscribedrates Sync subscribed rates
  * @apiName syncsubscribedrates
  * @apiGroup Services
  *
  * @apiDescription Sync subscribed rates.
  *
  * @apiUse ResponseJSON
  */
  syncSubscribedRates(req, res) {
    var user_id = req.user.user_id || '';
    var IsCs = req.body.IsCs || req.query.IsCs || '';

    User.findById(user_id, (err, u) => {
      if (err) {
        log.error('syncSubscribedRates() : Find the user Error : ', err);
        res.json({success: false, message: 'Cannot find the user.', error: err})
      } else {
        var db_ics = u.subscribedprices

        var latest_ics
        if (IsCs.date > db_ics.date) {
          log.info('syncSubscribedRates() : Update subscribed rates.');
          latest_ics = IsCs
          u.subscribedprices = IsCs
          u.markModified('subscribedprices')
          u.save((err) => {
            if (err) {
              log.error('syncSubscribedRates() : Update subscribed rates Error : ', err);
              res.json({success: false, message: 'Cannot update subscribed rates', error: err})
            }
          })
        } else {
          log.info('syncSubscribedRates() : Get subscribed rates.');
          latest_ics = db_ics
        }
        log.info('syncSubscribedRates() : Synchronize subscirbed rates successfully.');
        res.json({success: true, message: 'Synchronize subscirbed rates successfully.', iscs: latest_ics})
      }
    })
  },

  /**
  * @api {get} /v1/iscsrates Get iscsrates
  * @apiName iscsrates
  * @apiGroup Services
  *
  * @apiDescription Get IsCs rates.
  *
  * @apiParam {IsCs[]} IsCs An array of IsCs.
  * @apiParam {Object} IsCs.ic ic Object.
  * @apiParam {String} IsCs.ic.institution_swift Institution SWIFT.
  * @apiParam {String} IsCs.ic.currency_code Currency Code.
  * @apiParam {Date} fromdate From Date.
  * @apiParam {Date} todate To Date.
  *
  * @apiSuccess {iscsrates[]} iscsrates An array of IsCs,rates,date.
  * @apiSuccess {Object} iscsrates.icrates icrate Object.
  * @apiSuccess {Object} iscsrates.icrates.institution Institution.
  * @apiSuccess {Object} iscsrates.icrates.currency Currency.
  * @apiSuccess {Date} iscsrates.icrates.fromdate From Date.
  * @apiSuccess {Date} iscsrates.icrates.todate To Date.
  * @apiSuccess {rates[]} iscsrates.icrates.rates Rates.
  *
  * @apiUse ResponseJSON
  */
  iscsrates(req, res) {
    var iscs = JSON.parse(req.query.iscs) || [];
    var fromdate = req.query.fromdate || '';
    var todate = req.query.todate || moment().format('YYYY-MM-DD');

    var iscsrates = []
    var queries = []

    if (!fromdate) {
      var p = new Promise((resolve, reject) => {
        User.findById(req.user.user_id, (err, u) => {
          if (err) {
            reject(err);
          } else {
            var rates_interval = u.userconf.rates_interval;
            fromdate = moment().subtract(rates_interval, 'days').format('YYYY-MM-DD');
            resolve();
          }
        });
      })
      queries.push(p);
    }

    iscs.forEach((ic) => {
      var p = new Promise((resolve, reject) => {
        var institution_swift = ic.institution_swift;
        var currency_code = ic.currency_code;

        Rate.find({
          institutionSWIFT: institution_swift,
          target: currency_code,
          date: {
            $gt: fromdate,
            $lt: todate
          }
        }).sort({date: -1, time: -1}).exec((err, rs) => {
          if (err) {
            reject(err)
          } else {
            var rate = {
              institution: institution_swift,
              currency: currency_code,
              fromdate: fromdate,
              todate: todate,
              rates: rs
            };
            iscsrates.push(rate)
          }
          resolve()
        });
      });
      queries.push(p);
    });

    Promise.all(queries).then(() => {
      log.info('iscsrates() : Retrieve all IsCs rate successfully.');
      res.json({success: true, message: 'Retrieve all IsCs rate successfully.', iscsrates: iscsrates});
    }).catch((err) => {
      log.error('iscsrates() : Retrieve rate for one IC Error : ', err);
      res.json({success: false, message: 'Fail to retrieve rate for one IC.', error: err});
    });
  },

  /**
  * @api {get} /v1/subscribedics Get subscribed ICs rates
  * @apiName subscribedics
  * @apiGroup Services
  *
  * @apiDescription Get subscribed ICs rates.
  *
  * @apiParam {ics[]} ICs An array of ICs.
  * @apiParam {Object} ICs.ic ic Object.
  * @apiParam {String} ICs.ic.institution_swift Institution SWIFT.
  * @apiParam {String} ICs.ic.currency_code Currency Code.
  *
  * @apiSuccess {subscribedics[]} subscribedics An array of ICs,rates,date.
  * @apiSuccess {Object} subscribedics.icrates icrate Object.
  * @apiSuccess {Object} subscribedics.icrates.institution Institution.
  * @apiSuccess {Object} subscribedics.icrates.currency Currency.
  * @apiSuccess {Date} subscribedics.icrates.fromdate From Date.
  * @apiSuccess {Date} subscribedics.icrates.todate To Date.
  * @apiSuccess {rates[]} subscribedics.icrates.rates Rates.
  *
  * @apiUse ResponseJSON
  */
  subscribedics(req, res) {
    var ics = JSON.parse(req.query.ics) || [];

    var subscribedics = [];
    var queries = [];

    ics.forEach((ic) => {
      var institution_swift = ic.institution_swift;
      var currency_code = ic.currency_code;

      var q = new Promise((resolve, reject) => {
        Rate.findOne({institutionSWIFT: institution_swift, target: currency_code}).sort({date: -1, time: -1}).exec((err, rs) => {
          if (err) {
            reject(err)
          } else {
            var rate = {
              institution_swift: institution_swift,
              currency_code: currency_code,
              rate: rs
            };
            subscribedics.push(rate);
            resolve();
          }
        });
      });

      queries.push(q);
    });

    Promise.all(queries).then((results) => {
      log.info('subscribedics() : Retrieve all ICs rate successfully.');
      res.json({success: true, message: 'Retrieve all ICs rate successfully.', subscribedics: subscribedics});
    }).catch((err) => {
      log.error('subscribedics() : Retrieve rate for ICs Error : ', err);
      res.json({success: false, message: 'Fail to retrieve rate for ICs.', error: err});
    });
  },

  /**
  * @api {get} /v1/subscribedic Get subscribed IC and rates
  * @apiName subscribedic
  * @apiGroup Services
  *
  * @apiDescription Get subscribed IC and rates.
  *
  * @apiParam {ic} ICs IC.
  * @apiParam {Object} ic ic Object.
  * @apiParam {String} ic.institution_swift Institution SWIFT.
  * @apiParam {String} ic.currency_code Currency Code.
  *
  * @apiUse ResponseJSON
  */
  subscribedic(req, res) {
    var ic = JSON.parse(req.query.ic) || {};

    var institution_swift = ic.institution_swift || '';
    var currency_code = ic.currency_code || '';

    User.findById(req.user.user_id, (err, u) => {
      if (err || !u) {
        log.error('subscribedic() : Retrieve Institution error.');
        res.json({success: false, message: 'Retrieve Institution error.'});
      } else {
        var rates_limit = u.userconf.rates_limit;

        Institution.findOne({
          swift: ic.institution_swift
        }, (err, i) => {
          if (err || !i) {
            log.error('subscribedic() : Retrieve Institution error.');
            res.json({success: false, message: 'Retrieve Institution error.'});
          } else {
            Currency.findOne({
              code: currency_code
            }, (err, c) => {
              if (err || !c) {
                log.error('subscribedic() : Retrieve Currency error.');
                res.json({success: false, message: 'Retrieve Currency error.'});
              } else {
                Rate.find({institutionSWIFT: institution_swift, target: currency_code}).sort({date: -1, time: -1}).limit(rates_limit).exec((err, rs) => {
                  if (err) {
                    log.error('subscribedic() : Retrieve Currency error.');
                    res.json({success: false, message: 'Retrieve Currency error.'});
                  } else {
                    var icrates = {
                      institution: i,
                      currency: c,
                      rates: rs
                    }
                    log.info('subscribedic() : Retrieve IC and rates successfully.');
                    res.json({success: true, message: 'Retrieve IC and rates successfully.', icrates: icrates});
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  /**
  * @api {get} /v1/rateHistory Get rate history
  * @apiName ratehistory
  * @apiGroup Services
  *
  * @apiDescription Get rate history.
  *
  * @apiParam {Object} ictdd {institution,currency,type,fromdate,todate} Object.
  * @apiParam {String} ictdd.institution_swift Institution SWIFT.
  * @apiParam {String} ictdd.currency_code Currency Code.
  * @apiParam {String} ictdd.type Type.
  * @apiParam {Date} ictdd.fromdate From date.
  * @apiParam {Date} ictdd.todate To date.
  *
  * @apiSuccess {ratehistory[]} icrates An array of ratehistory.
  *
  * @apiUse ResponseJSON
  */
  rateHistory(req, res) {
    var ictdd = req.query.ictdd || '';

    var institution_swift = ictdd.institution_swift;
    var currency_code = ictdd.currency_code;
    var type = ictdd.type;
    var fromdate = ictdd.fromdate || Date.now();
    var todate = ictdd.todate || Date.now();

    Rate.find({
      institutionSWIFT: institution_swift,
      target: currency_code,
      datetime: {
        $gt: fromdate,
        $lt: todate
      }
    }).sort({date: -1}).exec((err, rh) => {
      if (err) {
        log.error('rateHistory() : Retrieve rate history Error : ', err);
        res.json({success: false, message: 'Fail to retrieve rate history.', error: err});
      } else {
        log.info('rateHistory() : Retrieve rate history successfully.');
        res.json({success: true, message: 'Retrieve rate history successfully.', ratehistory: rh});
      }
    });
  }
}

module.exports = services
