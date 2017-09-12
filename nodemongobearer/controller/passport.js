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
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var userSchema = new Schema({
  u_id: String
  
});
var User = mongoose.model('User', userSchema);
var BearerStrategy = require('passport-http-bearer').Strategy;



module.exports = function(passport){
passport.use(new BearerStrategy({},
	function(token,done){
    User.findOne({u_id: token},function(err, user){
    if(!user)
    		return done(null,false);
    return done(null,user);
    })
	}
	))
};
};