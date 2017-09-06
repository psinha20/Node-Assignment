exports.unflatten = function(flatObject) {
    var result = {};
    for (var loop in flatObject) {
        var keys = loop.split('.');
        keys.reduce(function(r, e, j) {
            return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? flatObject[loop] : {}) : [])
        }, result)
    }
    return result;
}