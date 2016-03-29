const clientES = require('../../../es.js');

module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_COUNTRIES,
    size: 100,
    body: {
      query: {
        match_all: {}
      },
      sort: { "label": {"order": "asc"}}
    }
     
    }, function (err, response) {

      var countries = [];
      response.hits.hits.forEach(function (country) {
        var countryObj = country._source;
        countries.push(countryObj);  
      });

    return callback(err, countries);
  });
}
