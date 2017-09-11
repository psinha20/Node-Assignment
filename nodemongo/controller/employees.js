

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 
var app = require('express')();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
var router = express.Router();
var request = require('request');
var http = require('http');
var employeeModel = require('../model/employeeModel.js');
module.exports = router;



router.get('/', function(res, req, next){
employeeModel.showAllEmployees();

});

router.get('/:name', function(req, res) {
	console.log(req.params.name);
employeeModel.getEmployeeByName(req.params.name);

});

router.get('/id/:id', function(req, res) {
console.log(req.params.id);
employeeModel.getEmployeeById(req.params.id);

});

router.get('/managees/:id', function(req, res) {
	
employeeModel.getEmployeesByManagees(req.params.id);

});

router.post('/', function(req, res, next) {
	

employeeModel.insertNewEmployee(req.body.e_id,req.body.name,req.body.manager_id);

});

router.delete('/delete/:id', function(req, res) {

employeeModel.deleteEmployee(req.params.id);
});

router.put('/updatename/:id', function(req, res, next) {

console.log(req.params.id);
console.log(req.body.name);
employeeModel.updateEmployeeName(req.params.id,req.body.name);

});

router.put('/updatemanager/:id', function(req, res, next) {

console.log(req.params.id);
console.log(req.body.managerid);
employeeModel.updateEmployeeManager(req.params.id,req.body.managerid);

});
