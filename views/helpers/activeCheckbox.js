'use strict';

const Handlebars = require('handlebars');

module.exports = function (isActive) {

  let result = "<input type=\"checkbox\" name=\"active\" checked > Active <br/>";

  if(isActive === false) {

    result = "<input type=\"checkbox\" name=\"active\"> Active <br/>";
  }

    return new Handlebars.SafeString(result);
}
