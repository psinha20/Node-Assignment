var fs = require('fs');

function readFile1() {
    return new Promise(function(resolve, reject) {

        fs.readFile('file1.txt', 'utf8', function(err, data) {
            if (data) {
                resolve(data);
            }

        })
    })
}

function writeToFile2(param) {
    return new Promise(function(resolve, reject) {
        fs.appendFile('file2.txt', param, function(err) {
            if (err) {
                throw err;
            } else {
                resolve();
            }
        })
    })
}

function readFile2() {
    return new Promise(function(resolve, reject) {
        fs.readFile('file2.txt', 'utf8', function(err, data) {
            if (data) {
                resolve(data);
            }

        })
    })

}

function writeToFile3(paramN) {
    return new Promise(function(resolve, reject) {
        fs.appendFile('file3.txt', paramN, function(err) {
            if (err) {
                throw err;
            } else {
                resolve();
            }
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
        console.log('All functions completed');
    }).catch(function() {
        console.log("Appending to File 3 failed");
    });