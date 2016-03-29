const clientES = require('../../../es.js');

module.exports = function (callback) {

	clientES.search({
	  index: process.env.ES_INDEX,
	  type: process.env.ES_TYPE_OWNERS,
	  size: 100,
	  body: {
	    query: {
				match_all: {}
	    },
	      sort: {"firstName": {"order": "asc"}}
	  }
	   
	  }, function (err, response) {

	    var owners = [];
	    response.hits.hits.forEach(function (owner) {
	      var ownerObj = owner._source;
	      owners.push(ownerObj);  
	    });

  	return callback(err, owners);
  });
}
