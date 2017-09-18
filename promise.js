var fs = require('fs');

function readFile1() {
  return new Promise(function(resolve, reject) {
    fs.readFile('file1.txt', 'utf8', function(err, data) {
      data ? resolve(data) : reject();
    })
  })
}

function readFile2() {
  return new Promise(function(resolve, reject) {
    fs.readFile('file2.txt', 'utf8', function(err, data) {
      data ? resolve(data) : reject();
    })
  })
}

function writeToFile2(parameter) {
  return new Promise(function(resolve, reject) {
    fs.appendFile('file2.txt', parameter, function(err) {
      err ? reject() : resolve();
    })
  })
}

function writeToFile3(parameter) {
  return new Promise(function(resolve, reject) {
    fs.appendFile('file3.txt', parameter, function(err) {
      err ? reject() : resolve();
    })
  })
}

readFile1()
  .then(writeToFile2).catch(function() {
    console.log("File 1 not read");
  }).then(readFile2).catch(function() {
    console.log("Appending to File2 failed");
  }).then(writeToFile3).catch(function() {
    console.log("File 2 not read");
  }).then(function() {
    console.log("All functions completed");
  }).catch(function() {
    console.log("Appending to File 3 failed");
  });