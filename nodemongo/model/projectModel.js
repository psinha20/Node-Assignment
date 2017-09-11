var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  p_id: Number,
  title: String,
  employees: Array,
  managed_by: Number
  
});
var Project = mongoose.model('Project', projectSchema);
exports.Project=Project;
exports.getAllProjects=function()
{
	Project.find({}, function(err, users) {
  if (err) throw err;
  console.log(users);
});

}

exports.getProjectByName=function(nameSearch)
{
Project.findOne({title:nameSearch},function (err,doc){

console.log(doc);
});
}

exports.getProjectById=function(idSearch)
{
Project.findOne({p_id:idSearch},function (err,doc){

console.log(doc);
});
}

exports.getProjectsByManager=function(id)
{
	Project.findOne({managed_by:id},function (err,doc){

console.log(doc);
});
}

exports.addProject=function(newId,newTitle,NewEmployees,newManager)
{
var newProject = Project();
newProject.p_id=newId;
newProject.title=newTitle;
newProject.employees=NewEmployees;
newProject.managed_by=newManager;	
newProject.save(function(err){
if (err) throw err;
console.log("User Saved");
})
}

exports.deleteProjectById=function(idSearch)
{
	Project.findOneAndRemove({ p_id:idSearch }, function(err) {
  if (err) throw err;

  console.log('project deleted!');
});
}

exports.updateProjectTitle=function(id,titleNew)
{
	Project.update({ p_id: id }, { $set: { title: titleNew }}, function(err){
if(err) throw err;
console.log('updated title');
});
}

exports.updateProjectManager=function(id,managerNew)
{
Project.update({ p_id: id }, { $set: { managed_by: managerNew }}, function(err){
if(err) throw err;
console.log('updated manager');
});
}

exports.addEmployeeToProject=function (id,newEmployee)
{
Project.update({ p_id: id }, { $push: { employees: newEmployee }}, function(err){
if(err) throw err;
console.log('updated employees');
});
}