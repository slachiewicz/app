module.exports = function(experience, isCurrent) {
  var results = '';
  // var results = isCurrent ? "<h2>Current company: </h2>" : "<h2>Past company: </h2>";

  results += "<p>" + {{experience.org}} + "</p>";
  results += "<h2>Position:</h2>";
  results += "<p>" + {{experience.title}}+ "</p>";
  results += "<h2>Date: </h2>";
  results += "<p>" + {{experience.date}} + "</p>";
  results += "<h2>Description: </h2>";
  results += "<p>" + {{experience.desc}} + "</p>";
  results += "<h2>Location: </h2>";
  results += "<p>" + {{experience.location}} + "</p>";

  return results;
};


  