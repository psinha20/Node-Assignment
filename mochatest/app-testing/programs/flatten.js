exports.flatten = function (unflatObject) {
  if (typeof unflatObject != 'object') return false;
  var flattenedObject={};
  for(var loop in unflatObject)
    {
        if(typeof (unflatObject[loop])=='object')
         {
            var flatobject=exports.flatten(unflatObject[loop]);
           for(secondaryLoop in flatobject)
             {
                  flattenedObject[loop+'.'+secondaryLoop]=flatobject[secondaryLoop];
             }
         }
       else
         flattenedObject[loop]=unflatObject[loop];
    }
  return flattenedObject;
}
