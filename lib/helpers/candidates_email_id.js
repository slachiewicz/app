module.exports = function (emails, ids) {
  var result = [];

  emails.reduce(function (newObj, value, iterator) {
    newObj = {email: value, id: ids[iterator]};
    return result.push(newObj);
  },{});

  return result;
}