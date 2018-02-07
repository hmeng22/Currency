var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    default: ''
  },
  firstname: String,
  lastname: String,
  // password: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  createdate: {
    type: Date,
    default: Date.now()
  },
  lastsignindate: Date,
  role: {
    type: String,
    enum: [
      'client', 'admin'
    ],
    default: 'client'
  },
  access_token_valid_key: String,
  reset_password_private_secret_key: String,
  reset_password_token_key: String,
  refresh_token_private_secret_key: String,
  refresh_token_key: String,

  //
  subscribedIC: {
    type: [new Schema({date: Date, institution_swift: String, currency_code: String})],
    default: []
  },
  userconf: {
    rates_limit: {
      type: Number,
      default: 50
    },
    rates_interval: {
      type: Number,
      default: 7
    }
  }
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'username'});

module.exports = mongoose.model('User', userSchema);
