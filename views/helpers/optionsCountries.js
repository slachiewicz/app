'use strict';

const Handlebars = require('handlebars');

module.exports = function (country, idCountry) {

  let result = "";

  if( parseInt(country.value) === parseInt(idCountry) ) {
    result = "<option value=\"" + country.value + "\" selected >" + country.label + "</option>";

  } else {

    result = "<option value=\"" + country.value + "\">" + country.label + "</option>";
  }

    return new Handlebars.SafeString(result);
}
