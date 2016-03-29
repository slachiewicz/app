const clientES = require('../../../es.js');

module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_SECTORS,
    size: 100,
    body: {
      query: {
        match_all: {}
      },
      sort: { "dateAdded": {"order": "desc"}}
    }
     
    }, function (err, response) {

      var sectors = [];
      response.hits.hits.forEach(function (sector) {
        var sectorObj = sector._source;
        sectors.push(sectorObj);  
      });

    return callback(err, sectors);
  });
}
