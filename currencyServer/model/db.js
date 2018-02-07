var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var currencyStructure = require('../model/currencyStructure');
var Currency = currencyStructure.Currency;
var Institution = currencyStructure.Institution;

var currencyData = require('../initData/InitDataCurrency');
var institutionData = require('../initData/InitDataInstitution');

function initDatabase() {

  currencyData.forEach((c) => {
    institutionData.forEach((i) => {
      if (i.foreigncurrenycodes.includes(c.code)) {
        c.institutionSWIFT.push(i.swift)
      }
    });
  });

  var cp = initModelData(Currency, currencyData, "Currency")
  var ip = initModelData(Institution, institutionData, "Institution")

  return Promise.all([cp, ip]).then(() => {
    console.log("Success >>> Initlize Database Data Done.");
  }).catch((err) => {
    console.log("Failure >>> Initlize Database Data Error : ", err);
  });
};

function initModelData(model, data, name) {
  return new Promise((resolve, reject) => {
    model.remove({}, (err) => {
      if (err) {
        reject(err)
      } else {
        console.log("> Init " + name + " Data .")
        model.insertMany(data, (err, docs) => {
          if (err) {
            reject(err)
          } else {
            resolve(docs)
          }
        })
      }
    })
  })
};

if (process.env.IS_TESTING) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>   TESTING DATABASE   <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>   TESTING DATABASE   <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>   TESTING DATABASE   <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  mongoose.connect(process.env.MONGODB_ADDRESS_TESTING);
} else {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> DEV || PROD DATABASE <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> DEV || PROD DATABASE <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> DEV || PROD DATABASE <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  mongoose.connect(process.env.MONGODB_ADDRESS);
}
var connection = mongoose.connection;

connection.on('error', function(err) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>    Database Error    <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log(error);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>    Database Error    <<<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> -------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<');
});
connection.once('open', function() {
  console.log('db : mongodb connected.');
  connection.db.listCollections().next(function(err, collection) {
    if (err) {
      console.log('Error >>> Initlize Database  : ', err);
    } else {
      if (!collection) {
        console.log('Start >>> Initlize Database Data.');
        initDatabase();
      } else {
        console.log('Database exists >>> connect directly.');
      }
    }
  });
});
