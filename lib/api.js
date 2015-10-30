exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/save',
    config: {
      description: 'save JSON object',
      handler: function (request, reply) {
        console.log(request.payload);
       
      }
    }
  }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Api'
};
