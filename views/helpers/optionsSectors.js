'use strict';

const Handlebars = require('handlebars');

module.exports = function (sector, sectorsData) {

  let result = '';

  let idsSector = sectorsData ? sectorsData.map(sector => sector.id) : [];

  if( idsSector.indexOf(sector.id.toString()) > -1)  {

    result = "<option value=\"" + sector.id + "\" selected >" + sector.name + "</option>";

  } else {

    result = "<option value=\"" + sector.id + "\">" + sector.name + "</option>";
  }

    return new Handlebars.SafeString(result);
}
