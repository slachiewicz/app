'use strict';

module.exports = function (emails) {

  const result = emails.filter(function (email) {
    return email.timestamp > Date.now() - (30 * 24 * 60 * 60 * 1000);
  });

  return result.length > 0;
}


