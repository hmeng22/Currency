var mongoose = require('mongoose');

var CountryCurrencySchema = mongoose.Schema({
  country_name: String,
  country_official_name_ar: String,
  country_official_name_cn: String,
  country_official_name_en: String,
  country_official_name_es: String,
  country_official_name_fr: String,
  country_official_name_ru: String,
  country_display_name: String,
  country_capital: String,
  country_continent: String,
  country_dial: String,
  country_region_code: Number,
  country_region_name: String,
  country_top_level_domain: String,
  country_code_alpha_2: String,
  country_code_alpha_3: String,
  country_code_numeric_3: Number,
  national_wealth_2017: Number,
  currency_name: String,
  currency_country_name: String,
  currency_alphabetic_code: String,
  currency_numeric_code: Number,
  currency_notes: [
    {
      name: String,
      value: Number,
      rank: Number,
      front_image: [
        {
          storage_key: String,
          storage_location: String,
          marker_target_id: String,
          marker_active_flag: Boolean,
          marker_tracking_rating: Number,
          marker_duplicates: String
        }
      ],
      back_image: [
        {
          storage_key: String,
          storage_location: String,
          marker_target_id: String,
          marker_active_flag: Boolean,
          marker_tracking_rating: Number,
          marker_duplicates: String
        }
      ]
    }
  ],
  currency_coins: [
    {
      value: Number,
      rank: Number
    }
  ],
  currency_notes_material: String
});

module.exports = mongoose.model('CountryCurrency', CountryCurrencySchema);
