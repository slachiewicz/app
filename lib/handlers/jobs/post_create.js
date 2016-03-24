const clientES = require('../../es.js');
const Joi = require('joi');
const getOwners = require('./helpers/get_owners.js');
const getJobObject = require('./helpers/get_payload_object.js');
const dateReverse = require('./helpers/date_reverse_helper.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('login');
  } {

    getOwners(function (errOwners, owners) {
       // $lab:coverage:off$
      if (errOwners) {
        console.log(errOwners);
      }
      // $lab:coverage:on$
    
      request.payload.startDate = dateReverse(request.payload.startDate) || null;
      request.payload.dateEnd = dateReverse(request.payload.dateEnd) || null;

      var schema = {
        title: Joi.string().alphanum().min(3).required(),
        employmentType: Joi.required(),
        owner: Joi.required(),
        client: Joi.required(),
        customText1: Joi.required(),
        customText2: Joi.required(),
        customText3: Joi.string().alphanum().min(3).required(),
        customText12: Joi.required(),
        description: Joi.required(),
        startDate: Joi.date().format('YYYY-MM-DD').allow(null),
        dateEnd: Joi.date().format('YYYY-MM-DD').allow(null)
      }

      var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

      var paramsES = {
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE_JOBS,
      };

      if (!validationObject.error) {
        var jobObj = getJobObject(request.payload, owners);

        if (request.payload.id) {
           //update
          paramsES.id = request.payload.id;
          jobObj.id = parseInt(request.payload.id);
          paramsES.body = {doc: jobObj};

          //update keep the property jobs
          clientES.update(paramsES, function(errorUpdate, responseUpdate) {
            return reply.redirect('/jobs/list');
          })
          
        } else {

          //create
          paramsES.body = jobObj;

          clientES.index(paramsES, function (err, response) {
            return reply.redirect('/jobs/list');
          });
        }

      } else {
        return reply.redirect('/jobs/create')
      }
      
    }); 
  }
}
