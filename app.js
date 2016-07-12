var express = require('express');

var app = express.createServer();

app.get('/about', function(){
	res.send('<h1>About Us</h1>');
});