module.exports = function(query, field) {
  var result = 0;
  var terms = query.split(' ');
  var fields = field.split(' ');


  terms = terms.map(function(w){
    return w.toLowerCase();
  });

  fields = fields.map(function(w){
    return w.toLowerCase();
  });

  terms.forEach(function(term) {
    if(term !== '' && fields.indexOf(term) !== -1) {
      result += 1;
    }
  });
  return result;
}
