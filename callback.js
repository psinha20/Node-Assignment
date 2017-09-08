var fs = require('fs');

fs.readFile('file1.txt', 'UTF8', function(err, data) {
  fs.appendFile('file2.txt', data, function(err) {
    fs.readFile('file2.txt', 'UTF8', function(err, data) {
      fs.appendFile('file3.txt', data, function(err) {
        console.log('End of operations');
      });
    });
  });
});