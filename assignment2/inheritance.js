function employee (nameS)
{
    this.name=nameS;
    
}
//employee.prototype.getname=function()
//
 //   return this.name;
//}
function manager(salaryS){
   
    this.salary=salaryS;
    
}

var emp=new employee("Samarth");
manager.prototype=emp;

var m=new manager(1000);

console.log(m.name);
