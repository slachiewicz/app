'use strict';

const Handlebars = require('handlebars');

module.exports = function (seniorityValue) {

  const seniorityValues = [
    "Junior",
    "Mid-level",
    "Senior",
    "Director"
  ];

  let result = "";

  seniorityValues.forEach(function(seniority) {

    if (seniority === seniorityValue) {
      result += "<option value=\"" + seniority + "\" selected>" + seniority + "</option>";
    } else {
      result += "<option value=\"" + seniority + "\">" + seniority + "</option>"
    }

  })

    return new Handlebars.SafeString(result);
}
