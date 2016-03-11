'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    var clientObj = {};

    clientObj.name = request.payload.name;
    var possibleNames = request.payload.possibleNames.split(',');
    possibleNames = possibleNames.map(name => {return name.trim()});
    clientObj.possibleNames = possibleNames;
    clientObj.accountManager = parseInt(request.payload.accountManager);
    clientObj.terms = request.payload.terms;
    clientObj.contactName = request.payload.contactName;
    clientObj.contactEmail = request.payload.contactEmail;
    clientObj.contactPhone = request.payload.contactPhone;
    clientObj.active = (request.payload.active === 'on') ? true : false;
    clientObj.createdAt = parseInt(request.payload.createdAt) || Date.now();

    var paramsES = {
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_CLIENTS,
      body: clientObj
    };

    if (request.payload.id) {
      //update
      paramsES.id = request.payload.id;
      clientObj.id = parseInt(request.payload.id);
    }

    console.log(clientObj);
    clientES.index(paramsES, function (err, response) {
      return reply.redirect('/clients/list'); 
    });  
  }  
}