module.exports = function(language) {
  
  if (language.fluency.length > 0) {
    return "<li><span class='each-lang'><span class='check-highlight'>" + language.lang + " - " + language.fluency +  "</span></span></li>";
  } else {
    return "<li><span class='each-lang'><span class='check-highlight'>" + language.lang + "</span></span></li>";
  }  
   
};
