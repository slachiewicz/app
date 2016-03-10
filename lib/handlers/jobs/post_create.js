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
      
      if (!validationObject.error) {
        console.log('inside')
        var jobObj = getJobObject(request.payload, owners);
        return reply(jobObj);

      } else {
        console.log('outside')
        return reply.redirect('/jobs/create');
      }
    }); 
  }
}
