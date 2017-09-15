exports.unflatten = function(flatObject) {
	if (typeof flatObject != 'object') return false;
    var result = {};
    for (var loop in flatObject) {
        var keys = loop.split('.');
        keys.reduce(function(r, e, j) {
            return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? flatObject[loop] : {}) : [])
        }, result)
    }
    return result;
}