exports.calculateFrequency = function(string) {
    var frequency = {};
    var loop;
    for (loop = 0; loop < string.length; loop++) {
        var stringIterator = string.charAt(loop);
        if (stringIterator.match(".*[a-z].*")) {
            if (frequency[string.charAt(loop)]) {
                frequency[string.charAt(loop)]++;
            } else {
                frequency[string.charAt(loop)] = 1;
            }
        }
    }
    return frequency;
}