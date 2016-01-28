var intersection = require('./intersection.js');
var union = require('./union.js');
var sortByLevel = require('./sort_by_level_skill.js');

module.exports = function (searchedSkills, candidateObj) {

  var intersectionSkills = intersection(searchedSkills, candidateObj);
  var sortedSkills = sortByLevel(candidateObj);
  
  return union(intersectionSkills, sortedSkills).slice(0,4);
};