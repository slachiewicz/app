module.exports = function (skill) {
    if(skill.level === 0) {

        return "<li><span class='each'>" + skill.skill + "</span></li>";
    } else {
        return "<li><span class='each'>" + skill.level + " - " + skill.skill + "</span></li>";
    }
};
