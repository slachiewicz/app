var Handlebars = require('handlebars');
module.exports = function(experience) {
  experience.title = Handlebars.Utils.escapeExpression(experience.title);
  experience.org = Handlebars.Utils.escapeExpression(experience.org);
  experience.date = Handlebars.Utils.escapeExpression(experience.date);
  experience.location = Handlebars.Utils.escapeExpression(experience.location);
  experience.desc = Handlebars.Utils.escapeExpression(experience.desc);

  var results = '';
  results += "<p>" + "<strong><span class='check-highlight'>" + experience.title + "</span></strong>";
  results += "<br/><span class='check-highlight'>" + experience.org + "</span>";
  results += "<br/>" + "<span class='exp-date'><span class='check-highlight'>" + experience.date + " | "+ experience.location + "</span></span>" + "</p>";
  results += "<p class='desc'><span class='check-highlight'>" + experience.desc + "</span></p>";
  results += "<br/>";

  return new Handlebars.SafeString(results);
};
