exports.unflatten = function(flatObject) {
  var result = {};
  for (var loop in flatObject) {
    var keys = loop.split('.');
    keys.reduce(function(accumulator, currentValue, currentIndex) {
      return accumulator[currentValue] || (accumulator[currentValue] = isNaN(Number(keys[currentIndex + 1])) ? (keys.length - 1 == currentIndex ? flatObject[loop] : {}) : [])
    }, result)
  }
  return result;
}