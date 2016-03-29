'use strict';

const Handlebars = require('handlebars');

module.exports = function (owner, idOwner) {

  let result = '';

  if(!idOwner) {
    result = "<option value=\"" + owner.id + "\">" + owner.name + "</option>";
    return new Handlebars.SafeString(result);
  }

  if( owner.id.toString() === idOwner.toString() ) {

    result = "<option value=\"" + owner.id + "\" selected >" + owner.name + "</option>";

  } else {

    result = "<option value=\"" + owner.id + "\">" + owner.name + "</option>";
  }

    return new Handlebars.SafeString(result);
}
