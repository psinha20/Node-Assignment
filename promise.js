var fs = require('fs');

function step1(){
	return new Promise(function(resolve,reject){
    	
   		fs.readFile('file1.txt', 'utf8', function (err,data) {
    		if(data) {
      			resolve(data);
    		}
    		else console.log('File 1 not read!');
  			})
		})
}

function step2(param){
console.log('second parameter'+param);
return new Promise(function(resolve,reject){
fs.appendFile('file2.txt', param, function (err) {
        if(err) {
          throw err; 
        }
        else {
          console.log('done2');
          resolve(); 
        }
      })
})
}

 function step3(){
 return new Promise(function(resolve,reject){
   console.log('reading file 2'); 
   fs.readFile('file2.txt', 'utf8', function (err,data) {
    if(data) {
      console.log('passing'+data);
      resolve(data);
    }
    else console.log('File 2 not read!');
  })
})

}

function step4(paramN){
console.log('received'+paramN);
return new Promise(function(resolve,reject){
fs.appendFile('file3.txt', paramN, function (err) {
        if(err) {
          throw err; 
        }
        else {
          console.log('done4');
          resolve(); 
        }
      })
})
}


step1()
.then(step2)
.then(step3)
.then(step4)
.then(function(){console.log('All steps completed');});