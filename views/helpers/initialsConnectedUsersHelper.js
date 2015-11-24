module.exports = function(name) {

  return name.match(/\b(\w)/g).join('');  

};