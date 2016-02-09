var Joi = require('joi');
var sendEmail = require('./helpers/sendemail_gmail.js');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/email',
    config: {
      description: 'create email',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        }

        var schema = {
          email: Joi.required()
        }
        var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

        if (!validationObject.error) {
          var userProfile = {};
          var emailList = request.payload.email;
          var emails = [];

          if (typeof emailList === 'string') {
            emails.push(emailList);
          } else {
            emails = emailList;
          }
        
          userProfile.firstname = JSON.parse(process.env.MAP_ID_USER)[request.auth.credentials.id]; 

          userProfile.image = request.auth.credentials.image.url;

          return reply.view('email', {emails: emails, userProfile:userProfile});
        }
        return reply.redirect('/');
      }
    }

  },
  {
    method: 'POST',
    path: '/sendemail',
    config: {
      description: 'send email',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        }

        console.log('Payload', request.payload);
        sendEmail(request, function (err, response) {
          if (err) {
            console.log(err);
          }

          console.log('REsponse', response);
          return reply('<pre><code>' + JSON.stringify(response, null, 2) + '</code></pre>');
        })
      }
    }
  }
]);

  return next();
};

exports.register.attributes = {
  name: 'Email'
};