'use strict';

const Handlebars = require('handlebars');

module.exports = function (employment) {

  const employmentType = [
    "",
    "Permanent",
    "Contract",
    "Temporary",
    "Temp to Perm",
    "Fixed Contract"
  ];

  let result = "";
  //
  employmentType.forEach(function(type) {

    if (type === employment) {
      result += "<option value=\"" + type + "\" selected>" + type + "</option>";
    } else {
      result += "<option value=\"" + type + "\">" + type + "</option>"
    }

  })

    return new Handlebars.SafeString(result);
}
