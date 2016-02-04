var Handlebars = require('handlebars');
module.exports = function (emails) {

  var result = ""; 
  emails.forEach(function (email) {
    result += "<li>" + email + "</li>"; 
     
  });

  return new Handlebars.SafeString(result);
};