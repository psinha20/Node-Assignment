var fs = require('fs');

function fileOperations(readFile1, appendFile2, readFile2, appendFile3) {
  fs.readFile(readFile1, 'UTF8', function(err, data) {
    if (err) handleError(err);
    fs.appendFile(appendFile2, data, function(err) {
      if (err) handleError(err);
      fs.readFile(readFile2, 'UTF8', function(err, data) {
        if (err) handleError(err);
        fs.appendFile(appendFile3, data, function(err) {
          if (err) handleError(err);
          console.log('End of operations');
        });
      });
    });
  });
}

function handleError(err) {
	console.log(err);
	throw new FatalError("Execution stopped");
}

fileOperations('file1.txt', 'file2.txt', 'file2.txt', 'file3.txt');
