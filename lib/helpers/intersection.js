module.exports = function (searchedSkills, candidateSkillObj) {
  var result = [];
    
  searchedSkills.forEach(function (skillString) {
    candidateSkillObj.forEach(function(skillObj) {
        if (skillString.toLowerCase() === skillObj.skill.toLowerCase() ) {
            result.push(skillObj)
        }
    });
  });
    
  return result;
}
