var Handlebars = require('handlebars');
module.exports = function (skills) {
  
  var result = "";

  skills.split(',').filter(Boolean).forEach(function (item) {

    result +=  "<span class='skill-job'>" + item.trim() + "</span>";
  })
    
  return new Handlebars.SafeString(result);
};