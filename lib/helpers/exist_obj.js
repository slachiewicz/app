module.exports = function (obj, arr) {

  var result = false;

  arr.forEach(function (element) {

    if (element.skill.toLowerCase() === obj.skill.toLowerCase()) {
      result = true;
    }
    
  });

  return result;
}