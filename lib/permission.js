exports.register = function (server, option, next) {

  server.route([
    {
      method: 'GET',
      path: '/permission',
      config: {
        description: 'return a permission page',
        auth: false,
        handler: function (request, reply) {

          return reply.view('permission');
        }
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Permission'
}
