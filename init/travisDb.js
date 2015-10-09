var es = require('./elasticSearch.js');
var candidate = require(__dirname + '/../tmp/candidate.json');

es.create({
  index: 'globalm',
  type: 'contacts',
  id: 1,
  body: candidate
}, function (error, response) {
  if(error) {
      console.log(error);
  }
  console.log('initialize candidate with id ' + 1);
  es.close();
});



