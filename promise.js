var fs = require('fs');

function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      data ? r esolve() : reject();

    })
  })
}

function writeToFile2(param) {
  return new Promise(function(resolve, reject) {
    fs.appendFile('file2.txt', param, function(err) {
      err ? reject() : resolve();
    })
  })
}

function writeToFile3(paramN) {
  return new Promise(function(resolve, reject) {
    fs.appendFile('file3.txt', paramN, function(err) {
      err ? reject() : resolve();
    })
  })
}

readFile('file1.txt')
  .then(writeToFile2).catch(function() {
    console.log("File 1 not read");
  }).then(readFile('file2.txt')).catch(function() {
    console.log("Appending to File2 failed");
  }).then(writeToFile3).catch(function() {
    console.log("File 2 not read");
  }).then(function() {
    console.log('All functions completed');
  }).catch(function() {
    console.log("Appending to File 3 failed");
  });