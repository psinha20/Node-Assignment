var express = require('express');
var Client = require('node-rest-client').Client;
 
var client = new Client();
var router = express.Router();
var rp = require('request-promise');
var request = require('request');
//Routes will go here
module.exports = router;

router.get('/', function(req, res, next) {
	console.log('i m here');
  request.get('https://api.createsend.com/api/v3.1/clients.json',{
  	'auth' : {
  		'user' : '9a86a35217185b745506196eb27709a0',
  		'pass' : 'x'
   	}
  }, function (error, response, body) {
  if (!error ) {
    res.send(body) 
  }
  else console.log(error);
})
  
});


router.get('/:id/lists.json', function(req, res, next) {
	console.log('i m yo yo here');
  request.get("https://api.createsend.com/api/v3.1/clients/"+ req.params.id+"/lists.json",{
  	'auth' : {
  		'user' : '9a86a35217185b745506196eb27709a0',
  		'pass' : 'x'
   	}
  }, function (error, response, body) {
  if (!error ) {
    res.send(body) 
  }
  else console.log(error);
})
  
});

router.get('/:id', function(req, res){

	console.log('i m here in specific');
	var clientId = req.params.id;
  	request.get("https://api.createsend.com/api/v3.1/clients/"+clientId+".json",{
  	'auth' : {
  		'user' : '9a86a35217185b745506196eb27709a0',
  		'pass' : 'x'
   	}
  }, function (error, response, body) {
  if (!error ) {
    res.send(body) 
  }
  else console.log(error);
})
});

router.delete('/:id', function(req, res){

	console.log('i m here in delet');
	var clientId = req.params.id;
  	request.delete("https://api.createsend.com/api/v3.1/clients/"+clientId+".json",{
  	'auth' : {
  		'user' : '9a86a35217185b745506196eb27709a0',
  		'pass' : 'x'
   	}
  }, function (error, response, body) {
  if (!error ) {
    res.send(body) 
  }
  else console.log(error);
})
});



/*
router.post("/",function(req, res){
  var remote = request('https://api.createsend.com/api/v3.1/clients.json');

  req.pipe(remote);
  remote.pipe(res);
}); */

router.post("/",function(req, res){
  var remote = request('https://api.createsend.com/api/v3.1/clients.json',{ 'auth':{'user':'9a86a35217185b745506196eb27709a0','pass' : 'x'}});

  req.pipe(remote);
  remote.pipe(res);
});