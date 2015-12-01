var Handlebars = require('handlebars');
module.exports = function(language) {
  var result = "";
  language.lang = Handlebars.Utils.escapeExpression(language.lang);
  if (language.fluency.length > 0) {
    language.fluency = Handlebars.Utils.escapeExpression(language.fluency);
    result = "<li><span class='each-lang'><span class='check-highlight'>" + language.lang + " - " + language.fluency +  "</span></span></li>";
  } else {
    result = "<li><span class='each-lang'><span class='check-highlight'>" + language.lang + "</span></span></li>";
  }
  return new Handlebars.SafeString(result);
};
