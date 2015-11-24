exports.register = function (server, option, next) {

  server.route([
    {
      method: 'POST',
      path: '/favourite',
      config: {
        description: 'update the list of favorite id for a specific profile',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: function (request, reply) {
          console.log(request);

          if (!request.auth.isAuthenticated) {
           return reply("Tu reves");
          }
          else {
          return reply('updated');

          }   //get the id of the user

          //find the profile in es

          //update the favorite property of the profile with the new id user

          //save in es the new profile

        }
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Favourite'
}
