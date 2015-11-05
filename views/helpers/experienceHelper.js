module.exports = function(experience) {
  
  var results = '';
  results += "<p>" + "<strong>" + experience.title + "</strong>";
  results += "<br/>" + experience.org;
  results += "<br/>" + "<span class='exp-date'>" + experience.date + " | "+ experience.location + "</span>" + "</p>";
  results += "<p class='desc'>" + experience.desc + "</p>";
  results += "<br/>";

  return results;
};


  