module.exports = function (mili) {

  var result = mili / 1000;
  var seconds = result / 60;
  result /= 60
  var minutes = result / 60;
  result /= 60
  var hours = result / 24;
  result /= 24
  
  return Math.floor(result);
}

