var existObj = require('./exist_obj.js');

module.exports = function (searchedSkill, candidateObj) {
  var result = searchedSkill;
  candidateObj.forEach(function(obj) {
     
    if (!existObj(obj, searchedSkill)) {       
      result.push(obj);
    }
    
  })
  return result;
}
