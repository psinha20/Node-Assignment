var http = require('http');
var fse = require('fs-extra');
var fs = require('fs');


var thirdFile;
const readMultipleFiles = require('read-multiple-files');

function readFile1 (callback) {
 fs.readFile("file1.txt", "UTF8", function(err, data) {
    if (err) { 
    	throw err 
    };
    firstFile = data.toString();
    console.log(firstFile);
    if (callback) callback(firstFile);
});



}

function appendFile2 (data, callback) {
	fs.appendFile('file2.txt', data, function (err) {
  		if (err) throw err;
  		console.log('Saved!');
  		if (callback) callback();

});	

}

function readFile2 (callback) {
 fs.readFile("file2.txt", "UTF8", function(err, data) {
    if (err) { 
    	throw err 
    };
    secondFile = data.toString();
    if (callback) callback(secondFile);
});


}

function appendFile3 (data) {
	fs.appendFile('file3.txt', data, function (err) {
  		if (err) throw err;
  		console.log('Saved!');
	});	

}

readFile1(appendFile2(readFile2(appendFile3)));
