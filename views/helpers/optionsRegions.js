'use strict';

const Handlebars = require('handlebars');

module.exports = function (regionValue) {

  const regions = [
    "",
    "UK & Ireland",
    "Scandinavia",
    "Eastern Europe",
    "Western Europe",
    "Southern Europe",
    "Asia Pacific",
    "North America",
    "South America",
    "Central America",
    "Africa",
    "Middle East",
    "North Africa",
    "Sub Saharan Africa"
  ]

  let result = "";
  //
  regions.forEach(function(region) {

    if (region === regionValue) {
      result += "<option value=\"" + region + "\" selected>" + region + "</option>";
    } else {
      result += "<option value=\"" + region + "\">" + region + "</option>"
    }

  })

    return new Handlebars.SafeString(result);
}
