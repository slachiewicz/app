'use strict';

const Handlebars = require('handlebars');

module.exports = function (categoriesData) {

  console.log('categoriesDAtea' , categoriesData);

  let categories = [
    {id: "958406", name: "Android Development" },
    {id: "1210106" , name: "Backend Development"},
    {id: "1034734", name: "Client Services"},
    {id: "1046586", name: "Development"},
    {id: "1210105" , name: "Frontend Development" },
    {id: "958407", name: "iOS Development"},
    {id: "1034735", name: "Management"},
    {id: "1046587", name: "Marketing" },
    {id: "1209450", name: "Sales"},
    {id: "1209449", name: "Testing" },
    {id: "1034733", name: "UX & Design"},

  ]

  let idsCategories = categoriesData.map(category => category.id);
  let result = '';

  categories.forEach(function(category){

    if(idsCategories.indexOf(category.id) > -1) {

      result += "<option value=\"" + category.id + "\" selected >" + category.name + "</option>";

    } else {

      result += "<option value=\"" + category.id + "\">" + category.name + "</option>";
    }

  })

  return new Handlebars.SafeString(result);
}
