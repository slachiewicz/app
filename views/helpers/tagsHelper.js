module.exports = function (tagName) {

  var tags = ["favourite", "contacted", "incomplete", "placed"];
  var iconSpan = ["li_diamond", "li_data", "li_eye","li_tag"]; 
  
  var index = tags.indexOf(tagName);

  if (index !== -1) {
    return "<span class='" + iconSpan[index] + "'></span>"
  }
  else {
    return '';
  }
}
