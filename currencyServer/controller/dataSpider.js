var axios = require('axios');
var schedule = require('node-schedule');

var faker = require('faker');
var moment = require('moment');

axios.defaults.baseURL = 'http://localhost:3003';

var ics = [];

axios.post('/signin', {
  username: 'a',
  password: 'a'
}).then((res) => {
  axios.defaults.headers.common['token'] = res.data.token.access_token;
  return axios.get('/v1/institutions');
}).then((res) => {
  var result = res.data;
  result.institutions.forEach((i) => {
    i.foreigncurrenycodes.forEach((c) => {
      ics.push({institution_swift: i.swift, basecurrency_code: "CNY", currency_code: c});
    });
  });

  // var task = schedule.scheduleJob('5 * * * * *', fakeRateSheetData);

  fakeRateSheetData();

  console.log(">>> running ...");
}).catch((err) => {
  console.log("ics Error : ", err);
});

// fake data
function fakeRateSheetData() {
  for (var t = ics.length; t > 0; t--) {
    var ic = ics[faker.random.number(ics.length - 1)];

    var institution_swift = ic.institution_swift;
    var basecurrency_code = ic.basecurrency_code;
    var currency_code = ic.currency_code;
    var date = moment(faker.date.recent()).format('YYYY-MM-DD');

    var rates = [];

    for (var i = faker.random.number(24); i > 0; i--) {
      rates.push({
        institutionSWIFT: institution_swift,
        base: basecurrency_code,
        target: currency_code,
        buy: faker.finance.amount(),
        sell: faker.finance.amount(),
        cashbuy: faker.finance.amount(),
        cashsell: faker.finance.amount(),
        centralparityrate: faker.finance.amount(),
        date: date,
        time: moment(faker.date.recent()).format('hh:mm:ss')
      })
    }

    var rateSheet = {
      institution_swift: institution_swift,
      date: date,
      rates: rates
    }

    axios.post('/v1/ratesdata', rateSheet).then((res) => {
      console.log("Feed data successfully.");
    }).catch((err) => {
      console.log("Feed date : err : ", err);
    });
  }
}
