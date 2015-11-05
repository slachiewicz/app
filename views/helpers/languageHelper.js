module.exports = function(language) {
  
  if (language.fluency.length > 0) {
    return "<li><span class='each-lang'>" + language.lang + " - " + language.fluency +  "</span></li>";
  } else {
    return "<li><span class='each-lang'>" + language.lang + "</span></li>";
  }  
   
};
