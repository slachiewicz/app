'use strict';

const Handlebars = require('handlebars');

module.exports = function (owner, idOwner) {

  let result = '';

  if(parseInt(owner.id) === parseInt(idOwner)) {

    result = "<option value=\"" + owner.id + "\" selected >" + owner.name + "</option>";

  } else {

    result = "<option value=\"" + owner.id + "\">" + owner.name + "</option>";
  }

    return new Handlebars.SafeString(result);
}
