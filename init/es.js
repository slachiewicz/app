var es = require('./elasticSearch.js');
var candidate = require(__dirname + '/../tmp/candidate.json');
var indexes = [0,1,2,3];
indexes.forEach ( function (id) {
    es.create({
      index: 'globalm',
      type: 'contact',
      id: id,
      body: candidate
    }, function (error, response) {
      if(error) {
          console.log(error);
      }
      console.log('initialize candidate with id ' + id);
    });
});
