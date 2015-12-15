var Handlebars = require('handlebars');
module.exports = function (note) {

  note.notes = Handlebars.Utils.escapeExpression(note.notes);
  note.company = Handlebars.Utils.escapeExpression(note.company);

  var results = "<p>" + "<strong>" + note.createdAt + " " + note.author + " " + "</strong>";
  if (note.status !== undefined && note.notes !== '' && note.company !== '') {
    if (note.status === "submitted") {
      results += note.status + " to ";
    } else {
      results += note.status + " at ";
    }

    results += note.company + "<br>" + note.notes + "</p>";
  }
  if (note.status === undefined && note.notes !== '' && note.company !== '') {
    results += "(no status)" + " " + note.company + "<br>" + note.notes + "</p>";  
  }
  if (note.status === undefined && note.notes !== '' && note.company === '') {
    results += "(no status, no company)" + "<br>" + note.notes + "</p>";  
  }
  return new Handlebars.SafeString(results);
};