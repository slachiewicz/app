exports.register = function (server, options, next) {

  server.route({
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

        var userProfile = {};
        var emailList = request.payload.email;
        var emails = [];

        if (typeof emailList === 'string') {
          emails.push(emailList);
        } else {
          emails = emailList;
        }
      
        userProfile.firstname = JSON.parse(process.env.MAP_ID_USER)[request.auth.credentials.id]; 

        userProfile.image = request.auth.credentials.image;

       return reply.view('email', {emails: emails, userProfile:userProfile});
      }
    }

  });

  return next();
};

exports.register.attributes = {
  name: 'Email'
};