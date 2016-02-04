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

        var emails = request.payload.email;
        console.log(emails);

       return reply.view('email', {emails: emails});
      }
    }

  });

  return next();
};

exports.register.attributes = {
  name: 'Email'
};