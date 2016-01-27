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
    console.log('Complete List', completeList.slice(0,4));
    return completeList.slice(0,4);
 }

  var num = 4 - searchedSkills.length;
  console.log('Num',num);

  var sortedSkills = sortByLevel(contactSkills);
  console.log('SortedSkils',sortedSkills);
  console.log('completeList', completeList);

  for (var i = 0; i < sortedSkills.length; i++) {
    if (completeList.length === 4) {
      console.log('compete list is 4')
      break;
    } else {
      if (!existObj(sortedSkills[i], completeList)) {
        console.log('after break', completeList);

        completeList.push(sortedSkills[i]);
        console.log('result', completeList)
      }
    }
    
  }
  return completeList;
}