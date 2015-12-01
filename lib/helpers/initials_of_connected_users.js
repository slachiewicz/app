/**
 * extract first character of each name
 */
var mapFunc = function(name) {
  return name[0];
}
/**
 * split person's name by spaces and extract just the first letter
 */
var get_initials = function(names) {
  return names.split(' ').map(mapFunc).join('');
};
// module.exports.get_initials = get_initials;

module.exports = function get_intials_for_array_of_names(array_of_names) {
  return array_of_names.map(get_initials);
}
