var Handlebars = require('handlebars');
var miliToDays = require('./convertToDaysHelper.js');

module.exports = function (sentEmailObj) {
 
  console.log(sentEmailObj);
  if (sentEmailObj.timestamp !== undefined) {
    var difference = new Date().getTime() - sentEmailObj.timestamp;
    var days = miliToDays(difference);

    if (days < 30) {
      return new Handlebars.SafeString("<i class='fa fa-paper-plane last-email-30'></i>");
    }

    if (days < 90) {

      return new Handlebars.SafeString("<i class='fa fa-paper-plane last-email-90'></i>");
    }

    return new Handlebars.SafeString("<i class='fa fa-paper-plane last-email-regular'></i>");

  } else {
    return new Handlebars.SafeString("<i class='fa fa-paper-plane last-email-regular'></i>");
  }

};