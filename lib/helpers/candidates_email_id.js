module.exports = function (emails, ids, fn) {
  var result = [];

  emails.reduce(function (newObj, value, iterator) {
    newObj = {email: value, id: ids[iterator], firstName: fn[iterator]};
    console.log('-----',newObj);
    return result.push(newObj);
  },{});

  return result;
}