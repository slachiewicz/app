//sort from highest level 
module.exports = function (arr) {
  arr.sort(function (a, b) {
    if (a.level > b.level) {
      return -1;
    }
    if (a.level < b.level) {
      return 1;
    }
    return 0;
  });

  return arr;
}