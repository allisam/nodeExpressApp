//Module Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http')
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk')
var db = monk('localhost:27017/nodeapp');


//Set port number
var portnumber = 3000;


//Initialize Express
var app = express();
console.log('Express has been initialized');

function compile(str, path){
	return stylus(str)
	.set('filename', path)
	.use(nib())
}

//Set View Folder
app.set('views',__dirname+'/views');

//Initialize Jade
app.set('view engine', 'jade');
console.log('Jade has been initialized');

//Stylus Middleware

//Express 4 express.json
app.use(bodyParser.json());

//Express 4 express.urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Express 4 express.methodOverride
// override with different headers; last one takes precedence 
app.use(methodOverride('X-HTTP-Method'))          // Microsoft 
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData 
app.use(methodOverride('X-Method-Override'))      // IBM 

//Express 4 express.cookie-parser
app.use(cookieParser('mykey'));

//express.session is now just session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//Express 4 app.use(app.router) no longer necessary 

app.use(logger('dev'));
app.use(stylus.middleware(
	{
		src:__dirname + '/public',
		compile: compile
	}
));
app.use(express.static(__dirname+'/public'));

//Add routes
app.get('/', routes.index);
app.get('/userlist', routes.userlist(db));
app.post('/adduser', routes.adduser(db));

//Render Index Page
	//app.get('/', function(req, res){
		//res.render('index',
		//{title: 'Welcome'}
		//);	
	//});

app.listen(portnumber);
console.log('Server started at ' +portnumber);