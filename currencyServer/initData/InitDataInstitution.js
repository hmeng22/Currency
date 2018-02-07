var institutions = [
  // Central Banks
  {
    "country": "CHINA",
    "name": "中国人民银行",
    "class": "centralBank",
    "alias": "PBC",
    "swift": "PBOCCNBJ",
    "basecurrencycodes": ["CNY"],
    "foreigncurrenycodes": [
      "USD", "CAD", "EUR", "GBP", "JPY"
    ],
    "ratehistory": []
  }, {
    "country": "CHINA",
    "name": "中国外汇交易中心",
    "class": "centralBank",
    "alias": "CFX",
    "swift": "PBOCCNSF",
    "basecurrencycodes": ["CNY"],
    "foreigncurrenycodes": [
      "USD", "CAD", "EUR", "GBP", "JPY"
    ],
    "ratehistory": []
  },

  // Card Associations
  {
    "country": "CHINA",
    "name": "中国银联",
    "class": "cardAssociation",
    "alias": "UnionPay",
    "swift": "UnionPay",
    "basecurrencycodes": ["CNY"],
    "foreigncurrenycodes": [
      "USD", "CAD", "EUR", "GBP", "JPY"
    ],
    "ratehistory": []
  },

  // Commerical Banks
  {
    "country": "CHINA",
    "name": "中国银行",
    "class": "commericalBank",
    "alias": "BOC",
    "swift": "BKCHCN",
    "basecurrencycodes": ["CNY"],
    "foreigncurrenycodes": [
      "USD", "CAD", "EUR", "GBP", "JPY"
    ],
    "ratehistory": []
  }, {
    "country": "CHINA",
    "name": "中国工商银行",
    "class": "commericalBank",
    "alias": "ICBC",
    "swift": "ICBKCN",
    "basecurrencycodes": ["CNY"],
    "foreigncurrenycodes": [
      "USD", "CAD", "EUR", "GBP", "JPY"
    ],
    "ratehistory": []
  }, {
    "country": "CHINA",
    "name": "中国建设银行",
    "class": "commericalBank",
    "alias": "CCB",
    "swift": "PCBCCN",
    "basecurrencycodes": ["CNY"],
    "foreigncurrenycodes": [
      "USD", "CAD", "EUR", "GBP", "JPY"
    ],
    "ratehistory": []
  }, {
    "country": "CHINA",
    "name": "中国交通银行",
    "class": "commericalBank",
    "alias": "BoCom",
    "swift": "COMMCN",
    "basecurrencycodes": ["CNY"],
    "foreigncurrenycodes": [
      "USD", "CAD", "EUR", "GBP", "JPY"
    ],
    "ratehistory": []
  }
];

module.exports = institutions
