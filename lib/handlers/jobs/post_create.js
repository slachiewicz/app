const clientES = require('../../es.js');
const Joi = require('joi');
const listOwners = require('../../database-helpers/elasticsearch/get_owners.js');
const getJobObject = require('./helpers/get_payload_object.js');
const dateReverse = require('./helpers/date_reverse_helper.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {

    return reply.redirect('login');
  } else {

    listOwners(function (errOwners, owners) {

      // $lab:coverage:off$
      if (errOwners) {
        console.log(errOwners);
      }
      // $lab:coverage:on$

      request.payload.startDate = Date.now();
      request.payload.dateEnd = null

      var paramsES = {
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE_JOBS,
      };

      var jobObj = getJobObject(request.payload, owners);

      if (request.payload.id) {
         //update
        paramsES.id = request.payload.id;
        jobObj.id = parseInt(request.payload.id);
        paramsES.body = {doc: jobObj};

        //update keep the property jobs
        clientES.update(paramsES, function(errorUpdate, responseUpdate) {

          console.log('update user', errorUpdate, responseUpdate);
          return reply.redirect('/jobs/list');
        })

      } else {

        //create
        paramsES.body = jobObj;

        clientES.index(paramsES, function (err, response) {

          console.log('create new user');
          console.log(err, response);
          return reply.redirect('/jobs/list');
        });
      }
    });
  }
}
