const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
const secondHighest = require('../app-testing/programs/secondLargest').secondLargest([23, 78, 90, 65, 34]);
const unFlatten = require('../app-testing/programs/unflatten').unflatten({
  "flatJSON": false,
  "i.am.not.so.flat": true,
  "i.am.not.so.unflat": false,
  "i.am.a": "tree",
  "dates.0.day": 1,
  "dates.1.day": 8947
});
const flatten = require('../app-testing/programs/flatten').flatten({
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
const calculateFrequency = require('../app-testing/programs/calculateFrequency').calculateFrequency('dummy');
describe('Second Highest', function() {
  it('Second highest return value', function() {
    assert.equal(secondHighest, 78);
  });
  it('Second highest return type', function() {
    assert.typeOf(secondHighest, 'number');
  });
  it('Second highest return type Not', function() {
    assert.notTypeOf(secondHighest, 'string');
  });
  it('Second highest return type Not Null or Undefined', function() {
    assert.exists(secondHighest);
  });
});

describe('Unflatten', function() {
  it('Unflatten return value', function() {
    expect(unFlatten).to.deep.equal({
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

  });
  it('Unflatten return type', function() {
    assert.isObject(unFlatten, 'checking if its an object');
  });
  it('Unflatten return type Not', function() {
    assert.notTypeOf(unFlatten, 'string');
  });
  it('Unflatten return type Not Null or Undefined', function() {
    assert.exists(unFlatten);
  });
});

describe('Frequency', function() {
  it('Frequency return value', function() {
    expect(calculateFrequency).to.deep.equal({
      d: 1,
      u: 1,
      m: 2,
      y: 1
    }); //eql
  });
  it('Frequency return type', function() {
    assert.isObject(calculateFrequency, 'checking if its an object');
  });
  it('Frequency return type Not', function() {
    assert.notTypeOf(calculateFrequency, 'number');
  });
  it('Frequency type Not Null or Undefined', function() {
    assert.exists(calculateFrequency);
  });

});

describe('Flatten', function() {
  it('Flatten return type', function() {
    expect(flatten).to.deep.equal({
      "flatJSON": false,
      "i.am.not.so.flat": true,
      "i.am.not.so.unflat": false,
      "i.am.a": "tree",
      "dates.0.day": 1,
      "dates.1.day": 8947
    });
  });
  it('Flatten return type', function() {
    assert.isObject(flatten, 'checking if its an object');
  });
  it('Flatten return type Not', function() {
    assert.notTypeOf(flatten, 'number');
  });
  it('Flatten type Not Null or Undefined', function() {
    assert.exists(flatten);
  });
});