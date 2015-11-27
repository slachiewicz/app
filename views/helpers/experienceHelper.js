module.exports = function(experience) {
  
  var results = '';
  results += "<p>" + "<strong><span class='check-highlight'>" + experience.title + "</span></strong>";
  results += "<br/><span class='check-highlight'>" + experience.org + "</span>";
  results += "<br/>" + "<span class='exp-date'><span class='check-highlight'>" + experience.date + " | "+ experience.location + "</span></span>" + "</p>";
  results += "<p class='desc'><span class='check-highlight'>" + experience.desc + "</span></p>";
  results += "<br/>";

  return results;
};


  