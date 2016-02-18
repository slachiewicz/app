var Handlebars = require('handlebars');
module.exports = function (sentEmailObj) {

  var result = ""; 
  
  //get the timestamp for 30days before
  var thirtyDays = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);

  if (sentEmailObj.timestamp !== undefined) {
     if (thirtyDays < sentEmailObj.timestamp) {
      result += "<h3 class='email-indicator'>" + sentEmailObj.sentAt + '</h3>';
     } else {
        result += "<h3>" + sentEmailObj.sentAt + '</h3>';
     }
  } else {
    result += "<h3>" + sentEmailObj.sentAt + '</h3>';
  }

  return new Handlebars.SafeString(result);
};