var Handlebars = require('handlebars');
var miliToDays = require('./convertToDaysHelper.js');

module.exports = function (sentEmailObj, displayText) {
 
  if (sentEmailObj.timestamp !== undefined) {
    var difference = new Date().getTime() - sentEmailObj.timestamp;
    var days = miliToDays(difference);

    if (days < 30) {
      var result = "<i class='fa fa-paper-plane last-email-30'>";
      if (displayText) {
        result += "<span class='last-email-30'> Sent within a month</span>";
      }
      result += "</i>";
      return new Handlebars.SafeString(result);
    }

    if (days < 90) {
      result = "<i class='fa fa-paper-plane last-email-90'>";
      if (displayText) {
        result += "<span class='last-email-90'> Sent within 3 months</span>";
      }
      result += "</i>"
      return new Handlebars.SafeString(result);
    }
      result = "<i class='fa fa-paper-plane last-email-regular'>";
      if (displayText) {
        result += "<span class='last-email-regular'> Sent after 3 months</span>";
      }
      result += "</i>";
    return new Handlebars.SafeString(result);

  } else {
      result = "<i class='fa fa-paper-plane last-email-regular'>";
      if (displayText) {
        result += "<span class='last-email-regular'> Sent after 3 months</span>";
      }
      result += "</i>";
    return new Handlebars.SafeString(result);
  }

};