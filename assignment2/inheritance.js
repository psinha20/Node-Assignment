function Employee (name) {
    this.name = name;
    
                          }

function Manager(salary) {
   
    this.salary = salary;
    
                          }

var emp=new Employee("Samarth");
manager.prototype=emp;

var m=new Manager(1000);

console.log(m.name);
