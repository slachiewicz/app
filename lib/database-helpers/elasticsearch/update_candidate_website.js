'use strict';

var clientES = require('../../es.js');

module.exports = function (id, payload, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['jobApplications']
  }, function (errGet, responseGet) {
    
    var jobApplications = responseGet._source.jobApplications;
    var application = {};
    application.comments = payload.comments;
    application.skillset = payload.skillset;
    application.jobID = payload.jobID;
    application.timestamp = Date.now();
    jobApplications.push(application);

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: id,
      body: {
        doc: {
          contacts: {
            email: payload.email,
            phone: payload.phone
          },
          jobApplications: jobApplications
        }
      }
    }, function (errUpdate, responseUpdate) {

      return callback(errUpdate, responseUpdate._id);
    })
  })


 
}