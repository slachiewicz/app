var existObj = require('./exist_obj.js');

var sortByLevel = function (arr) {
  arr.sort(function (a, b) {
    if (a.level > b.level) {
      return -1;
    }
    if (a.level < b.level) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  return arr;
}


module.exports = function(searchedSkills, contactSkills) {

var completeList = searchedSkills;

  if (completeList.length >= 4) {
    return completeList.slice(0,4);
 }

  var num = 4 - searchedSkills.length;
  var sortedSkills = sortByLevel(contactSkills);
  console.log('sortedSkills',sortedSkills);

  for (var i = 0; i < sortedSkills.length; i++) {
    if (completeList.length === 4) {
      console.log('----',completeList);
      break;
    } else {
      if (!existObj(sortedSkills[i], completeList)) {
        completeList.push(sortedSkills[i]);
      }
    }
    
  }
  return completeList.concat(sortByLevel(contactSkills).slice(0, num));
}