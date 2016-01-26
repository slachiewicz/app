module.exports = function(query, skills) {
  // query  = ['css','js','python']
  // skills = [{level: 12, skill: 'Css'}]

  var result = [];

  query.forEach(function (skillString) {
    skills.forEach(function(skillObj) {
      if(skillObj.skill.toLowerCase() === skillString.toLowerCase()) {
        result.push(skillObj);
      }
    });
  });
  return result;
}
