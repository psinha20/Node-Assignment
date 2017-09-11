require('node-import');
var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');

module.exports = router;
//module.exports = Project;
var projectModel = require('../model/projectModel.js');

router.get('/', function(res, req, next){

projectModel.getAllProjects();

});

router.get('/:name', function(req, res) {
	console.log(req.params.name);
projectModel.getProjectByName(req.params.name);

});

router.get('/id/:id', function(req, res) {
	console.log(req.params.id);
projectModel.getProjectById(req.params.id);

});

router.get('/manager/:id', function(req, res) {
	
projectModel.getProjectsByManager(req.params.id);

});

router.post('/', function(req, res, next) {

projectModel.addProject(req.body.p_id,req.body.title,req.body.employees,req.body.managed_by);

});

router.delete('/delete/:id', function(req, res) {
projectModel.deleteProjectById(req.params.id);

});

router.put('/updatetitle/:id', function(req, res, next) {

console.log(req.params.id);
console.log(req.body.title);
projectModel.updateProjectTitle(req.params.id,req.body.title);
});

router.put('/updatemanager/:id', function(req, res, next) {

console.log(req.params.id);
console.log(req.body.manager);
projectModel.updateProjectManager(req.params.id,req.body.manager);

});

router.put('/addemployee/:id', function(req, res, next) {

console.log(req.params.id);
console.log(req.body.employee);
projectModel.addEmployeeToProject(req.params.id,req.body.employee);

});
