'use strict';

const clientES = require('../../es.js');
var Joi = require('joi');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    var schema = {
      companyName: Joi.string().alphanum().min(2).required()
    };

    var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

    if (!validationObject.error) {

      var clientObj = {
        companyNames: [request.payload.companyName]
      }

      clientES.index({
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE_CLIENTS,
        body: clientObj

      }, function (err, response) {

        // $lab:coverage:off$
        if(err) {
          return next(err);
        }
        // $lab:coverage:on$

        return reply.redirect('/clients/list');
      })

    } else {

      return reply.redirect('/clients/create');
    }
  }
}
