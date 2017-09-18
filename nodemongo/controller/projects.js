const express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
module.exports = router;
//module.exports = Project;
var projectModel = require('../model/projectModel.js');

router.get('/', function(res, req, next) {
  projectModel.getAllProjects();
});

router.get('/:name', function(req, res) {
  projectModel.getProjectByName(req.params.name);
});

router.get('/id/:id', function(req, res) {
  projectModel.getProjectById(req.params.id);
});

router.get('/manager/:id', function(req, res) {
  projectModel.getProjectsByManager(req.params.id);
});

router.post('/', function(req, res, next) {
  projectModel.addProject(req.body.p_id, req.body.title, req.body.employees, req.body.managed_by);
});

router.delete('/delete/:id', function(req, res) {
  projectModel.deleteProjectById(req.params.id);
});

router.put('/updatetitle/:id', function(req, res, next) {
  projectModel.updateProjectTitle(req.params.id, req.body.title);
});

router.put('/updatemanager/:id', function(req, res, next) {
  projectModel.updateProjectManager(req.params.id, req.body.manager);
});

router.put('/addemployee/:id', function(req, res, next) {
  projectModel.addEmployeeToProject(req.params.id, parseInt(req.body.employee));
});
