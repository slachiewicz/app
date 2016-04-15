'use strict';

const Joi = require('joi');
const getUser = require('../../database-helpers/elasticsearch/get_user.js');
const generateSignature = require('../../helpers/generate_signature');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  }

  const schema = {
    email: Joi.required()
  };

  const validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

  if (!validationObject.error) {

    let userProfile = {};
    userProfile.firstname = JSON.parse(process.env.MAP_ID_USER)[request.auth.credentials.id];
    userProfile.image = request.auth.credentials.image.url;

    const emailList = request.payload.email;
    let emails =[];

    if (typeof emailList === 'string') {

       emails.push(JSON.parse(emailList));

    } else {

       emailList.forEach(function (emailObj) {

        emails.push(JSON.parse(emailObj));
      });
    }

    getUser(request.auth.credentials.id, function(error, user) {

      const userObject = {
        fn: user.names.fullname,
        role: user.role,
        office: user.phones.office,
        mobile: user.phones.mobile,
        linkedin: user.linkedin
      };

      const signature = generateSignature(userObject);
      return reply.view('email', {emails: emails, userProfile:userProfile, user:user, signature: signature, pathUrl: request.payload.pathUrl});

    })

  }else {
    return reply.redirect('/');
  }

}
