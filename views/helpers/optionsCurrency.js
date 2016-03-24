'use strict';

const Handlebars = require('handlebars');

module.exports = function (currencyValue) {

  const currencies = [
    "GBP",
    "EUR",
    "USD"
  ];


  let result = "";
  //
  currencies.forEach(function(currency) {

    if (currency === currencyValue) {
      result += "<option value=\"" + currency + "\" selected>" + currency + "</option>";
    } else {
      result += "<option value=\"" + currency + "\">" + currency + "</option>"
    }

  })

    return new Handlebars.SafeString(result);
}
