module.exports = function (date) {

  if (date.substring(0,2) !== '20') {
    date = date.split('-').reverse().join('-');
  }
  
  return date;  
}