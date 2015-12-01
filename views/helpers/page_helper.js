var Handlebars = require('handlebars');
module.exports = function (page, prev, next, totalPages) {

  page = Handlebars.Utils.escapeExpression(page);
  prev = Handlebars.Utils.escapeExpression(prev);
  next = Handlebars.Utils.escapeExpression(next);
  totalPages = Handlebars.Utils.escapeExpression(totalPages);

  var result ='';
  if (Number(page) > 1) {
    result += "<a class=\"newer-posts\" id=\"prev\" href=\"" + prev + "\">&laquo;</a>"
  }
  result += "<span class=\"page-number\">"+ page + "&#47;" + totalPages + "</span>";

  if (Number(page) < totalPages ) {
    result += "<a class=\"older-posts\" id=\"next\" href=\"" + next + "\">&raquo;</a>"
  }

    return new Handlebars.SafeString(result);
};
