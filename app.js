var express = require('express');

var app = express();

app.get('/', function(req,res){
		res.render('index.ejs',{title: 'Hello Sadie'});
		
});

app.get('/about', function(req,res){
		res.render('layout.ejs',{title: 'About Sadie', body:'<h1>Sadie is the best Cat</h1>'});
		
});

app.get('/*', function(req,res){
		res.status(404).render('error.ejs',{title: 'Error'});
		
});


console.log('App running of localHost:3000');
app.listen(3000);