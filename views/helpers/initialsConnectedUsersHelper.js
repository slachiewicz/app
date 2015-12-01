module.exports = function(name) {
  return name.split(' ').map(n => n[0]).join('');
};
