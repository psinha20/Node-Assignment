// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
  // Write your code here
  max=Number.MIN_SAFE_INTEGER;
  max2=Number.MIN_SAFE_INTEGER;
  
  for(i=0;i<array.length;i++)
    {
      if(array[i]>max) max=array[i];
      
   }
  for(i=0;i<array.length;i++)
    {
      if(array[i]>max2&&array[i]<max) max2=array[i];
    }
  return max2;
}

// Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
function calculateFrequency(string) {
  // Write your code here
   var freq={};
    var i;
  for(i=0;i<string.length;i++)
    {
      var x=string.charAt(i);
      if(x.match(".*[a-z].*")){
      if(freq[string.charAt(i)] ) {freq[string.charAt(i)]++;}
      else {freq[string.charAt(i)]=1;}
      }
    }
 return freq;
}

// Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
function flatten(unflatObject) {
  // Write your code here
  var ans={};
  for(var i in unflatObject)
    {
        if(typeof (unflatObject[i])=='object')
         {
            var flatobject=flatten(unflatObject[i]);
           for(x in flatobject)
             {
                  ans[i+'.'+x]=flatobject[x];
             }
         }
       else
         ans[i]=unflatObject[i];
    }
  return ans;
}


// Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
function unflatten(flatObject) {
  // Write your code here
  var result = {}
  for (var i in flatObject) {
    var keys = i.split('.')
    keys.reduce(function(r, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? flatObject[i] : {}) : [])
    }, result)
  }
  return result
}
