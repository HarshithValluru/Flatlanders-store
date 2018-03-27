const mongojs = require("mongojs");
const express = require("express");
const ejs = require('ejs');
const bodyParser = require('body-parser');

// To sign up into MongoDB:
var databaseUrl = "flatStore"; 
var collections = ["gems"]
var db = mongojs(databaseUrl, collections);

// var {mongoose} = require('./db/mongoose');
// var {gems} = require('./models/gems');

var app = express();
app.use(express.static(__dirname+"/public"));
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.render('./flatlanders.html');
});

app.get('/retrieve',function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	db.gems.find(function(err, testData) {
		res.send(testData);
	});	
});

app.post('/addReviews',function (req, res, next) {
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader('Access-Control-Allow-Origin', '*');	
	db.gems.update({'name': req.body[0]},{$push :{'reviews':req.body[1]}},function(err,doc){
		console.log("Successfully inserted");
	});
	db.gems.update({ },{ $pull: { "reviews": { "stars": { "$exists": false } } } },{ "multi": true },function(err,doc){
		//console.log("DEL");
	});
	res.json(req.body[1]);
});

var server = app.listen(3000,()=>{
	console.log("Server is running at port 3000");
});