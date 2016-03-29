var Handlebars = require('handlebars');

module.exports = function (skill) {

    skill.skill = Handlebars.Utils.escapeExpression(skill.skill);
    skill.level = Handlebars.Utils.escapeExpression(skill.level);
    var result = "";
    if(parseInt(skill.level) === 0) {

        result = "<li><span class='each'><span class='check-highlight'>" + skill.skill + "</span></span></li>";
    } else {
        result = "<li><span class='each'><span class='check-highlight'>" + skill.level + " - " + skill.skill + "</span></span></li>";
    }
    return new Handlebars.SafeString(result);
};
