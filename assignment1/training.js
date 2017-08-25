
function secondLargest(array) {
  largest=Number.MIN_SAFE_INTEGER;
  secondLargest=Number.MIN_SAFE_INTEGER;
  var loop;
  for(loop=0;loop<array.length;loop++) {
      if(array[loop]>largest) largest=array[loop];
      
    				       			    }
  for(loop=0;loop<array.length;loop++){
      if(array[loop]>secondLargest&&array[loop]<largest) secondLargest=array[loop];
    				      			  }
  return secondLargest;
			                  }


function calculateFrequency(string){
  
    var freq={};
    var loop;
    for(loop=0;loop<string.length;loop++){
      var stringCharacter=string.charAt(loop);
      if(stringCharacter.match(".*[a-z].*")){
      if(freq[string.charAt(loop)] ) {freq[string.charAt(loop)]++;}
      else {freq[string.charAt(loop)]=1;}
                                            }
    				          			 }
    return freq;
			            		   }


function flatten(unflatObject){
   var ans={};
   for(var loop in unflatObject){
        if(typeof (unflatObject[loop])=='object'){
            var flatobject=flatten(unflatObject[loop]);
            for(innerLoop in flatobject){
                  ans[loop+'.'+innerLoop]=flatobject[innerLoop];
                                }
                                                  }
        else
            ans[loop]=unflatObject[loop];
                                 }
   return ans;
                              }


function unflatten(flatObject) {
  
  var result = {}
  for (var i in flatObject) {
    var keys = i.split('.');
    keys.reduce(function(r, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? flatObject[i] : {}) : [])
    							  }, result)
                            }
  return result
			      			    }
