var fs = require('fs');

function fileOperations(readFile1, appendFile2, readFile2, appendFile3) {
  fs.readFile(readFile1, 'UTF8', function(err, data) {
    if (err) throw err;
    fs.appendFile(appendFile2, data, function(err) {
      if (err) throw err;
      fs.readFile(readFile2, 'UTF8', function(err, data) {
        if (err) throw err;
        fs.appendFile(appendFile3, data, function(err) {
          if (err) throw err;
          console.log('End of operations');
        });
      });
    });
  });
}

fileOperations('file1.txt', 'file2.txt', 'file2.txt', 'file3.txt');