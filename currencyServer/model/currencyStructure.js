var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CurrencySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    require: true
  },
  codenumber: {
    type: String,
    require: true
  },
  institutionSWIFT: []
});

var RateSchema = new Schema({
  institutionSWIFT: String,
  date: String,
  time: String,
  base: String,
  target: String,
  buy: Number,
  sell: Number,
  cashbuy: Number,
  cashsell: Number,
  centralparityrate: Number,
  available: {
    type: Boolean,
    default: true
  }
});

var RateSheetSchema = new Schema({
  institutionSWIFT: String,
  date: String,
  rates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rate'
    }
  ],
  available: {
    type: Boolean,
    default: true
  }
});

var InstitutionSchema = new Schema({
  country: String,
  class: {
    type: String,
    enum: ['centralBank', 'commercialBank', 'cardAssociation'],
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  alias: String,
  swift: String,
  basecurrencycodes: [String],
  foreigncurrenycodes: [String],
  ratehistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'RateSheet'
    }
  ]
});

module.exports = {
  Currency: mongoose.model('Currency', CurrencySchema),
  Rate: mongoose.model('Rate', RateSchema),
  RateSheet: mongoose.model('RateSheet', RateSheetSchema),
  Institution: mongoose.model('Institution', InstitutionSchema)
}
