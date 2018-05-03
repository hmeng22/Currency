// ISO 3166 & ISO 4217 Standard
//
//   * ISO3166-1-Alpha-2
//   * ISO3166-1-Alpha-3
//   * ISO3166-1-numeric
//
//   * ISO4217-currency_alphabetic_code
//   * ISO4217-currency_country_name
//   * ISO4217-currency_name
//   * ISO4217-currency_numeric_code
//
//   * currency-notes
//   * currency-coins
//
// Reference
// 1. https://github.com/datasets/country-codes
// 2. https://en.wikipedia.org/wiki/National_wealth
// 3. http://www.whichwaytopay.com/United-States-Of-America-currency-US-Dollar-USD.asp
// 4. https://www.federalreserve.gov/paymentsystems/coin_currcircvalue.htm
// 5. https://www.federalreserve.gov/paymentsystems/coin_currcircvolume.htm

var CountryCurrency = function() {
  return {
    country_name: '',
    country_official_name_ar: '',
    country_official_name_cn: '',
    country_official_name_en: '',
    country_official_name_es: '',
    country_official_name_fr: '',
    country_official_name_ru: '',
    country_display_name: '',
    country_capital: '',
    country_continent: '',
    country_dial: '',
    country_region_code: 0,
    country_region_name: '',
    country_top_level_domain: '',
    country_code_alpha_2: '',
    country_code_alpha_3: '',
    country_code_numeric_3: 0,
    national_wealth_2017: 0,
    currency_name: '',
    currency_country_name: '',
    currency_alphabetic_code: '',
    currency_numeric_code: 0,
    currency_notes: [
      {
        value: '',
        rank: '',
        front_image: [],
        back_image: []
      }
    ],
    currency_coins: [
      {
        value: '',
        rank: ''
      }
    ],
    currency_notes_material: ''
  }
}

var csv = require('fast-csv');

var tools = require('../tools');
var log = tools.log;
var output = tools.output;
var backupFile = tools.backupFile;

var config = require('../config');
const CSV_FILE = config.initialDataCSVFilePath;
const OUTPUT_FILE = config.initialDataOutputFilePath;
const OUTPUT_ELASTIC = config.initialDataOutputElasticPath;

backupFile(OUTPUT_FILE);
backupFile(OUTPUT_ELASTIC);

var OUTPUT_FILE_JSON = [];

csv.fromPath(CSV_FILE, {headers: true}).transform(function(obj) {

  var cc = CountryCurrency();
  cc.country_name = obj.country_name;
  cc.country_official_name_ar = obj.country_official_name_ar;
  cc.country_official_name_cn = obj.country_official_name_cn;
  cc.country_official_name_en = obj.country_official_name_en;
  cc.country_official_name_es = obj.country_official_name_es;
  cc.country_official_name_fr = obj.country_official_name_fr;
  cc.country_official_name_ru = obj.country_official_name_ru;
  cc.country_display_name = obj.country_display_name;
  cc.country_capital = obj.country_capital;
  cc.country_continent = obj.country_continent;
  cc.country_dial = obj.country_dial;
  cc.country_region_code = Number(obj.country_region_code);
  cc.country_region_name = obj.country_region_name;
  cc.country_top_level_domain = obj.country_top_level_domain;
  cc.country_code_alpha_2 = obj.country_code_alpha_2;
  cc.country_code_alpha_3 = obj.country_code_alpha_3;
  cc.country_code_numeric_3 = Number(obj.country_code_numeric_3);
  cc.national_wealth_2017 = Number(obj.national_wealth_2017);
  cc.currency_name = obj.currency_name;
  cc.currency_country_name = obj.currency_country_name;
  cc.currency_alphabetic_code = obj.currency_alphabetic_code;
  cc.currency_numeric_code = Number(obj.currency_numeric_code);

  cc.currency_notes = [];
  var currency_notes_values_ranks = obj.currency_notes_values_ranks.split(",");
  var currency_notes_length = currency_notes_values_ranks.length;
  for (var i = 0; i < currency_notes_length; i++) {
    var currency_notes_obj = currency_notes_values_ranks[i].split(":");
    cc.currency_notes.push({
      name: obj.country_code_alpha_2.toLowerCase() + "_" + currency_notes_obj[0] + "_",
      value: Number(currency_notes_obj[0]),
      rank: Number(currency_notes_obj[1]) | 0,
      front_image: [],
      back_image: []
    })
  }

  cc.currency_coins = [];
  var currency_coins_values_ranks = obj.currency_coins_values_ranks.split(",");
  var currency_coins_length = currency_coins_values_ranks.length;
  for (var i = 0; i < currency_coins_length; i++) {
    var currency_coins_obj = currency_coins_values_ranks[i].split(":")
    cc.currency_coins.push({
      value: Number(currency_coins_obj[0]),
      rank: Number(currency_coins_obj[1]) | 0
    })
  }

  cc.currency_notes_material = obj.currency_notes_material

  return cc;
}).on("data", function(data) {
  log.record(data);

  OUTPUT_FILE_JSON.push(data);

  // output(OUTPUT_FILE, data);
  // output(OUTPUT_ELASTIC, {
  //   "index": {
  //     "_index": "cc",
  //     "_type": "cc"
  //   }
  // });
  // output(OUTPUT_ELASTIC, data);
}).on("end", function() {
  output(OUTPUT_FILE, OUTPUT_FILE_JSON);

  log.info("Success. Logs >>> ", config.logDirectory);
});
