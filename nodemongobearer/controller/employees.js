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
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var passport = require('passport');


var userSchema = new Schema({
  u_id: String
  
});
var User = mongoose.model('User', userSchema,'User');

var BearerStrategy = require('passport-http-bearer').Strategy; 
var employeeModel = require('../model/employeeModel.js');
module.exports = router;

passport.use(new BearerStrategy(
  function(token, done) {
  	console.log(token);
    User.findOne({ u_id:token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {  return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
)); 

router.get('/', passport.authenticate('bearer',{session:false}),function(res, req, next){
employeeModel.showAllEmployees();

});


router.get('/:name', passport.authenticate('bearer',{session:false}),function(req, res) {
	console.log(req.params.name);
employeeModel.getEmployeeByName(req.params.name);

});

router.get('/id/:id',passport.authenticate('bearer',{session:false}), function(req, res) {
console.log(req.params.id);
employeeModel.getEmployeeById(req.params.id);

});

router.get('/managees/:id',passport.authenticate('bearer',{session:false}), function(req, res) {
	
employeeModel.getEmployeesByManagees(req.params.id);

});

router.post('/',passport.authenticate('bearer',{session:false}),function(req, res, next) {
	

employeeModel.insertNewEmployee(req.body.e_id,req.body.name,req.body.manager_id);

});

router.delete('/delete/:id',passport.authenticate('bearer',{session:false}), function(req, res) {

employeeModel.deleteEmployee(req.params.id);
});

router.put('/updatename/:id', passport.authenticate('bearer',{session:false}),function(req, res, next) {

console.log(req.params.id);
console.log(req.body.name);
employeeModel.updateEmployeeName(req.params.id,req.body.name);

});

router.put('/updatemanager/:id',passport.authenticate('bearer',{session:false}), function(req, res, next) {

console.log(req.params.id);
console.log(req.body.managerid);
employeeModel.updateEmployeeManager(req.params.id,req.body.managerid);

});
