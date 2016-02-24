/*
* From a list of emails, ids and first names this function return an array of objects containing this values
[{email:-, id:-, firstName:-}, {}, ...]
*/
module.exports = function (emails, ids, fn) {
  var result = [];

  emails.reduce(function (newObj, value, iterator) {
    newObj = {email: value, id: ids[iterator], firstName: fn[iterator]};
    return result.push(newObj);
  },{});

  return result;
}
