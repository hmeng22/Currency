define({ "api": [  {    "type": "post",    "url": "/refreshtoken",    "title": "3. Refresh Token",    "name": "PostRefreshtoken",    "group": "Authorization",    "description": "<p>Refreh token requires a refresh_token.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "refresh_token",            "description": "<p>refresh_token (Mandatory)</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "token",            "optional": false,            "field": "token",            "description": "<p>info.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "Authorization"  },  {    "type": "post",    "url": "/signin",    "title": "2. Sign in",    "name": "PostSignin",    "group": "Authorization",    "description": "<p>Sign in needs username &amp; password.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username (Mandatory)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password (Mandatory)</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "token",            "optional": false,            "field": "token",            "description": "<p>info.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "Authorization"  },  {    "type": "post",    "url": "/signout",    "title": "4. Sign out",    "name": "PostSignout",    "group": "Authorization",    "description": "<p>Sign out.</p>",    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "Authorization",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/signup",    "title": "1. Sign up",    "name": "PostSignup",    "group": "Authorization",    "description": "<p>Sign up will register a new user.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username (Mandatory)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password (Mandatory)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email (Mandatory)</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "Authorization",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/v1/currencies",    "title": "Add currencies",    "name": "addCurrencies",    "group": "Currency",    "description": "<p>Add currencies.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Currency",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "delete",    "url": "/v1/currencies",    "title": "Delete currencies",    "name": "deleteCurrencies",    "group": "Currency",    "description": "<p>Delete currencies.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Currency",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/v1/currencies",    "title": "Get currencies",    "name": "getCurrencies",    "group": "Currency",    "description": "<p>Get all currencies.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Currency",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/v1/institutions",    "title": "Add institutions",    "name": "addInstitutions",    "group": "Institution",    "description": "<p>Add institutions.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Institution",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "delete",    "url": "/v1/institutions",    "title": "Delete institutions",    "name": "deleteInstitutions",    "group": "Institution",    "description": "<p>Delete institutions.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Institution",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/v1/institutions",    "title": "Get institutions",    "name": "getInstitutions",    "group": "Institution",    "description": "<p>Get all institutions.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Institution",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/v1/rates",    "title": "Add rates",    "name": "addRates",    "group": "Rate",    "description": "<p>Add rates.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Rate",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "delete",    "url": "/v1/rates",    "title": "Delete rates",    "name": "deleteRates",    "group": "Rate",    "description": "<p>Delete rates.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Rate",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/v1/ratesdata",    "title": "Update ratesdata",    "name": "updateRatesdata",    "group": "RatesData",    "description": "<p>Update ratesdata.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "RatesData",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/v1/rates",    "title": "Get rates",    "name": "getRates",    "group": "Rates",    "description": "<p>Get all rates.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Rates",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/v1/ratesheets",    "title": "Add ratesheets",    "name": "addRatesheets",    "group": "Ratesheet",    "description": "<p>Add ratesheets.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Ratesheet",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "delete",    "url": "/v1/ratesheets",    "title": "Delete ratesheets",    "name": "deleteRatesheets",    "group": "Ratesheets",    "description": "<p>Delete ratesheets.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Ratesheets",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/v1/ratesheets",    "title": "Get ratesheets",    "name": "getRatesheets",    "group": "Ratesheets",    "description": "<p>Get all ratesheets.</p>",    "version": "0.0.0",    "filename": "controller/system.js",    "groupTitle": "Ratesheets",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/v1/configuration",    "title": "Get configuration",    "name": "getConfiguration",    "group": "Services",    "description": "<p>Get configuration.</p>",    "version": "0.0.0",    "filename": "controller/services.js",    "groupTitle": "Services",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/v1/iscsrates",    "title": "Get iscsrates",    "name": "iscsrates",    "group": "Services",    "description": "<p>Get IsCs rates.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "IsCs[]",            "optional": false,            "field": "IsCs",            "description": "<p>An array of IsCs.</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "IsCs.ic",            "description": "<p>ic Object.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "IsCs.ic.institution_swift",            "description": "<p>Institution SWIFT.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "IsCs.ic.currency_code",            "description": "<p>Currency Code.</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "fromdate",            "description": "<p>From Date.</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "todate",            "description": "<p>To Date.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "iscsrates[]",            "optional": false,            "field": "iscsrates",            "description": "<p>An array of IsCs,rates,date.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "iscsrates.icrates",            "description": "<p>icrate Object.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "iscsrates.icrates.institution",            "description": "<p>Institution.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "iscsrates.icrates.currency",            "description": "<p>Currency.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "iscsrates.icrates.fromdate",            "description": "<p>From Date.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "iscsrates.icrates.todate",            "description": "<p>To Date.</p>"          },          {            "group": "Success 200",            "type": "rates[]",            "optional": false,            "field": "iscsrates.icrates.rates",            "description": "<p>Rates.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/services.js",    "groupTitle": "Services"  },  {    "type": "get",    "url": "/v1/rateHistory",    "title": "Get rate history",    "name": "ratehistory",    "group": "Services",    "description": "<p>Get rate history.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "ictdd",            "description": "<p>{institution,currency,type,fromdate,todate} Object.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ictdd.institution_swift",            "description": "<p>Institution SWIFT.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ictdd.currency_code",            "description": "<p>Currency Code.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ictdd.type",            "description": "<p>Type.</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "ictdd.fromdate",            "description": "<p>From date.</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "ictdd.todate",            "description": "<p>To date.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "ratehistory[]",            "optional": false,            "field": "icrates",            "description": "<p>An array of ratehistory.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/services.js",    "groupTitle": "Services"  },  {    "type": "get",    "url": "/v1/subscribedics",    "title": "Get subscribed ICs rates",    "name": "subscribedics",    "group": "Services",    "description": "<p>Get subscribed ICs rates.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "ics[]",            "optional": false,            "field": "ICs",            "description": "<p>An array of ICs.</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "ICs.ic",            "description": "<p>ic Object.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ICs.ic.institution_swift",            "description": "<p>Institution SWIFT.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ICs.ic.currency_code",            "description": "<p>Currency Code.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "subscribedics[]",            "optional": false,            "field": "subscribedics",            "description": "<p>An array of ICs,rates,date.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "subscribedics.icrates",            "description": "<p>icrate Object.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "subscribedics.icrates.institution",            "description": "<p>Institution.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "subscribedics.icrates.currency",            "description": "<p>Currency.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "subscribedics.icrates.fromdate",            "description": "<p>From Date.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "subscribedics.icrates.todate",            "description": "<p>To Date.</p>"          },          {            "group": "Success 200",            "type": "rates[]",            "optional": false,            "field": "subscribedics.icrates.rates",            "description": "<p>Rates.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/services.js",    "groupTitle": "Services"  },  {    "type": "post",    "url": "/v1/syncsubscribedrates",    "title": "Sync subscribed rates",    "name": "syncsubscribedrates",    "group": "Services",    "description": "<p>Sync subscribed rates.</p>",    "version": "0.0.0",    "filename": "controller/services.js",    "groupTitle": "Services",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/v1/configuration",    "title": "Update configuration",    "name": "updateConfiguration",    "group": "Services",    "description": "<p>Update configuration.</p>",    "version": "0.0.0",    "filename": "controller/services.js",    "groupTitle": "Services",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/reset_password",    "title": "4. Get reset password Page",    "name": "GetResetPassword",    "group": "User",    "description": "<p>Get reset password page.</p>",    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "get",    "url": "/user",    "title": "1. Get user info",    "name": "GetUser",    "group": "User",    "description": "<p>Get user information.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "access_token",            "description": "<p>access_token (Mandatory)</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "user",            "optional": false,            "field": "user",            "description": "<p>info.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/reset_password",    "title": "5. Reset password",    "name": "PostResetPassword",    "group": "User",    "description": "<p>Reset password.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password (Mandatory)</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "user",            "optional": false,            "field": "user",            "description": "<p>info.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/user",    "title": "2. Update user info",    "name": "PostUser",    "group": "User",    "description": "<p>Update user information.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "access_token",            "description": "<p>access_token (Mandatory)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  },  {    "type": "post",    "url": "/reset_password",    "title": "3. Request to reset password",    "name": "RequestResetPassword",    "group": "User",    "description": "<p>Request to reset password and send an email.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email (Mandatory)</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "controller/sysController.js",    "groupTitle": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "success",            "description": "<p>Specify if the request is successful.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Error message when 'success' is false.</p>"          }        ]      }    }  }] });
