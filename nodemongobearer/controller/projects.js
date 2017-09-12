require('node-import');
var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var passport = require('passport');
var userSchem = new Schema({
  u_id: String
  
});
var Users = mongoose.model('Users', userSchem,'User');
var BearerStrategy = require('passport-http-bearer').Strategy; 
module.exports = router;
//module.exports = Project;
var projectModel = require('../model/projectModel.js');


passport.use(new BearerStrategy(
  function(token, done) {
  	console.log(token);
    Users.findOne({ u_id:token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {  return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
)); 

router.get('/',passport.authenticate('bearer',{session:false}), function(res, req, next){

projectModel.getAllProjects();

});

router.get('/:name',passport.authenticate('bearer',{session:false}), function(req, res) {
	console.log(req.params.name);
projectModel.getProjectByName(req.params.name);

});

router.get('/id/:id', passport.authenticate('bearer',{session:false}),function(req, res) {
	console.log(req.params.id);
projectModel.getProjectById(req.params.id);

});

router.get('/manager/:id',passport.authenticate('bearer',{session:false}), function(req, res) {
	
projectModel.getProjectsByManager(req.params.id);

});

router.post('/', passport.authenticate('bearer',{session:false}),function(req, res, next) {

projectModel.addProject(req.body.p_id,req.body.title,req.body.employees,req.body.managed_by);

});

router.delete('/delete/:id', passport.authenticate('bearer',{session:false}),function(req, res) {
projectModel.deleteProjectById(req.params.id);

});

router.put('/updatetitle/:id', passport.authenticate('bearer',{session:false}),function(req, res, next) {

console.log(req.params.id);
console.log(req.body.title);
projectModel.updateProjectTitle(req.params.id,req.body.title);
});

router.put('/updatemanager/:id', passport.authenticate('bearer',{session:false}),function(req, res, next) {

console.log(req.params.id);
console.log(req.body.manager);
projectModel.updateProjectManager(req.params.id,req.body.manager);

});

router.put('/addemployee/:id',passport.authenticate('bearer',{session:false}), function(req, res, next) {

console.log(req.params.id);
console.log(req.body.employee);
projectModel.addEmployeeToProject(req.params.id,req.body.employee);

});