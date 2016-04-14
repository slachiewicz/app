var Handlebars = require('handlebars');

module.exports = function (viewedBy) {

    var result = "";

    result = "<li><span class='viewedBy-initials'>" + viewedBy.initials + "<span class='viewedBy-number'>" +viewedBy.timestamp.length +"</span>"+ "</span></li>";

    return new Handlebars.SafeString(result);
};
