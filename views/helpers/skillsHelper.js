module.exports = function (skill) {
    if(skill.level === 0) {

        return "<li><span class='each'><span class='check-highlight'>" + skill.skill + "</span></span></li>";
    } else {
        return "<li><span class='each'><span class='check-highlight'>" + skill.level + " - " + skill.skill + "</span></span></li>";
    }
};
