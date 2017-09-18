var http = require('http');
var dtFrequency = require('./programs/calculateFrequency');
var dtFlatten = require('./programs/flatten');
var dtSecondLargest = require('./programs/secondLargest');
var dtUnflatten = require('./programs/unflatten');
var assert = require('assert');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    frequencyReturned = dtFrequency.calculateFrequency('dummy');
    exports.frequencyReturned = frequencyReturned;


    flattenReturned = dtFlatten.flatten({
        "flatJSON": false,
        "i": {
            "am": {
                "not": {
                    "so": {
                        "flat": true,
                        "unflat": false
                    }
                },
                "a": "tree"
            }
        },
        "dates": [{
            "day": 1
        }, {
            "day": 8947
        }]
    });

    exports.flattenReturned = flattenReturned;
    secondLargestReturned = dtSecondLargest.secondLargest([3, 56, 7, 32, 9, 14]);

    exports.secondLargestReturned = secondLargestReturned;
    unflattenReturned = dtUnflatten.unflatten({
        "flatJSON": false,
        "i.am.not.so.flat": true,
        "i.am.not.so.unflat": false,
        "i.am.a": "tree",
        "dates.0.day": 1,
        "dates.1.day": 8947
    });

    exports.unflattenReturned = unflattenReturned;
    res.end();
}).listen(8080);