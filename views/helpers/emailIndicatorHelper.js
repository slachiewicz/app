var Handlebars = require('handlebars');
var miliToDays = require('./convertToDaysHelper.js');

module.exports = function (sentEmailObj, displayText) {
 
  if (sentEmailObj.timestamp !== undefined) {
    var difference = new Date().getTime() - sentEmailObj.timestamp;
    var days = miliToDays(difference);

    if (days < 30) {
      var result = "<i class='fa fa-paper-plane last-email-30'></i>";
      if (displayText) {
        result += "Sent within a month";
      }
      return new Handlebars.SafeString(result);
    }

    if (days < 90) {
      result = "<i class='fa fa-paper-plane last-email-90'></i>";
      if (displayText) {
        result += "Sent within 3 months";
      }
      return new Handlebars.SafeString(result);
    }
      result = "<i class='fa fa-paper-plane last-email-regular'></i>";
      if (displayText) {
        result += "Not contacted";
      }

    return new Handlebars.SafeString("<i class='fa fa-paper-plane last-email-regular'></i>");

  } else {
      result = "<i class='fa fa-paper-plane last-email-regular'>";
      if (displayText) {
        result += "Not contacted";
      }

    return new Handlebars.SafeString("<i class='fa fa-paper-plane last-email-regular'></i>");
  }

};