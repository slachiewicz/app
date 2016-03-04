const Joi = require('joi');
const getOwners = require('./helpers/get_owners.js');
const getJobObject = require('./helpers/get_payload_object.js');

module.exports = function (request, reply) {
 
  getOwners(function (errOwners, owners) {
     // $lab:coverage:off$
    if (errOwners) {
      console.log(errOwners);
    }
    // $lab:coverage:on$

    var schema = {
      title: Joi.string().alphanum().min(3).required(),
      employmentType: Joi.required(),
      owner: Joi.required(),
      customText1: Joi.required(),
      customText2: Joi.required(),
      customText3: Joi.string().alphanum().min(3).required(),
      customText12: Joi.required(),
      description: Joi.required()
    }

    var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });
    
    if (!validationObject.error) {

      var jobObj = getJobObject(request.payload, owners);
      
      return reply(jobObj);

    } else {
      
      return reply.redirect('/jobs/create');
    }

  }); 
}
