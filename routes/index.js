//Homepage
exports.index = function(req,res){
	res.render('index', {title: 'Welcome'});
}

//User List
exports.userlist = function(db){
	return function(req, res){
		var collection = db.get('usercollection');
		collection.find({},{},function(e,docs){
			res.render('userlist', {
				"userlist" : docs,
				title : "User List"
			});
		});
	};
};

//Add User Form
exports.adduser = function(db){
	return function(req, res){
		//Get Input Submissions
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var email = req.body.email;
		var username = req.body.username;
		//simple plain text password for a demo site
		var password = req.body.password;
		
		//set collection
		var collection = db.get('usercollection');
		
		//Submit to the DB
		collection.insert({
			"first_name" : first_name,
			"last_name" : last_name,
			"username" : username,
			"email" : email,
			"password" : password
		}, function(err,doc){
			if(err){
				res.send("There was a problem creating the user");
			}else{
				res.location('userlist');
				res.redirect('userlist');
			}
		});
	}
}