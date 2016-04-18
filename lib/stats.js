'use strict';

const getStats = require('./handlers/stats/get_stats');

exports.register = function (server, option, next) {

  server.route({
    method: 'GET',
    path: '/stats',
    config: {
      description: 'return stats page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getStats
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'Stats'
};
