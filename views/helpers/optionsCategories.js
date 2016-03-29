'use strict';

const Handlebars = require('handlebars');

module.exports = function (category, categoryData) {

  let result = '';

  if(!categoryData) {

    result = "<option value=\"" + category.id + "\">" + category.name + "</option>";
    return new Handlebars.SafeString(result);
  }

  let idsCategories = categoryData.map(category => category.id);

  if( idsCategories.indexOf(category.id.toString()) > -1)  {

    result = "<option value=\"" + category.id + "\" selected >" + category.name + "</option>";

  } else {

    result = "<option value=\"" + category.id + "\">" + category.name + "</option>";
  }

    return new Handlebars.SafeString(result);
}
