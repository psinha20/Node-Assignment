exports.calculateFrequency = function(string) {
    var frequency = {};
    var loop;
    for (loop = 0; loop < string.length; loop++) {
        var stringIterator = string.charAt(loop);
        if (stringIterator.match(".*[a-z].*")) {
            if (frequency[stringIterator]) {
                frequency[stringIterator]++;
            } else {
                frequency[stringIterator] = 1;
            }
        }
    }
    return frequency;
}