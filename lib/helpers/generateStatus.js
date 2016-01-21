module.exports = function(notes) {
  var result = "";

  if(notes.length > 0) {

    notes.forEach(function(note) {
      if(note.status !== undefined) {
        if(note.status === "submitted") {
          result = note.status + " to ";
        } else {
          result = note.status + " at ";
        }
        if(note.company !== '') {
          result += note.company;
        }else {
          result += "- no company ";
        }
      }
    })
  }
  return result;
}
