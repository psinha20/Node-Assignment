exports.secondLargest = function (array) {
  highest=Number.MIN_SAFE_INTEGER;
  secondHighest=Number.MIN_SAFE_INTEGER;
  
  for(loop=0;loop<array.length;loop++)
    {
      if(array[loop]>highest) highest=array[loop];
      
    }
  for(loop=0;loop<array.length;loop++)
    {
      if(array[loop]>secondHighest&&array[loop]<highest) secondHighest=array[loop];
    }
  return secondHighest;
}