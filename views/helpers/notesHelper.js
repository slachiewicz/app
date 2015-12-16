var Handlebars = require('handlebars');
module.exports = function (note) {

  note.notes = Handlebars.Utils.escapeExpression(note.notes);
  note.company = Handlebars.Utils.escapeExpression(note.company);

  var results = "<p>" + "<strong>" + note.createdAt + " " + note.author + " " + "</strong>";

  if(note.status !== undefined) {
    if(note.status === "submitted") {
      results += note.status + " to ";
    } else {
      results += note.status + " at ";
    }
  } else {
    results += "- no status "
  }

  if(note.company !== '') {
    results += note.company + " ";
  }else {
    results += "- no company ";
  }

  results += "<br>" + note.notes + "</p>";
  return new Handlebars.SafeString(results);

};
