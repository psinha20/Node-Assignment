var express = require('express');
var bodyParser = require('body-parser');
var app = require('express')();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var router = express.Router();
var request = require('request');
var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
  e_id: Number,
  name: String,
  manager_id: Number

});
var Employee = mongoose.model('Employee', employeeSchema);
var projectImport = require('./projectModel.js');
var Project = projectImport.Project;


exports.showAllEmployees = function() {
  Employee.find({}, function(err, users) {
    if (err) throw err;
    console.log(users);
  });
}

exports.getEmployeeByName = function(nameSearch) {
  Employee.findOne({
    name: nameSearch
  }, function(err, doc) {
    console.log(doc);
  });
}

exports.getEmployeeById = function(idSearch) {
  Employee.findOne({
    e_id: idSearch
  }, function(err, doc) {
    console.log(doc);
  });
}

exports.getEmployeesByManagees = function(idSearch) {
  Employee.findOne({
    manager_id: idSearch
  }, function(err, doc) {
    console.log(doc);
  });
}

exports.insertNewEmployee = function(idNew, nameNew, managerNew) {
  var newEmployee = Employee();
  newEmployee.e_id = idNew;
  newEmployee.name = nameNew;
  newEmployee.manager_id = managerNew;
  newEmployee.save(function(err) {
    if (err) throw err;
    console.log("User Saved");
  })
}

exports.deleteEmployee = function(id) {
  Employee.findOneAndRemove({
    e_id: id
  }, function(err) {
    if (err) throw err;
    console.log('employee deleted!');
  });
  Employee.update({
    e_id: id
  }, {
    $set: {
      manager_id: null
    }
  }, function(err) {
    if (err) throw err;
    console.log('updated manager');
  });
  Project.update({
    managed_by: id
  }, {
    $set: {
      managed_by: null
    }
  }, function(err) {
    if (err) throw err;
    console.log('managed by updated');
  });
  Project.update({}, {
    $pull: {
      employees: id
    }
  }, {
    multi: true
  }, function(err) {
    console.log("given" + id);
  });
}

exports.updateEmployeeName = function(id, nameNew) {
  Employee.update({
    e_id: id
  }, {
    $set: {
      name: nameNew
    }
  }, function(err) {
    if (err) throw err;
    console.log('updated');
  });
}

exports.updateEmployeeManager = function(id, managerId) {
  Employee.update({
    e_id: id
  }, {
    $set: {
      manager_id: managerId
    }
  }, function(err) {
    if (err) throw err;
    console.log('updated manager');
  });
}