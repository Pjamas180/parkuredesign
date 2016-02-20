// vendor library
var passport = require('passport');
var bcrypt   = require('bcrypt-nodejs');

// custom library
// model
var Model = require('../model');

// index
var home = function(req, res, next) {
	console.log("isAuthenticated in index: " + req.isAuthenticated());
	if(!req.isAuthenticated()) {
		res.redirect('/');
	} else {
		var user = req.user;

		if(user !== undefined) {
			user = user.toJSON();
		}
		res.render('home');
	}
};

// sign in
// GET
var signIn = function(req, res, next) {
	console.log("isAuthenticated in signIn: " + req.isAuthenticated());
	if(req.isAuthenticated()) {
		console.log("sign in get");
		res.redirect('/home');
	}
	res.render('index');
}

// sign in
// POST
var signInPost = function(req, res, next) {
	console.log("In signInPost");
	passport.authenticate('local', { successRedirect: '/home',
		failureRedirect: '/'}, function(err, user, info) {

			if(err) {
				return res.render('index');
			} 

			if(!user) {
				return res.render('index');
			}
			console.log(user);
			//	res.redirect('/home');
			req.logIn(user, function(err) {
				//return res.redirect('/home');
				console.log("in here???");
				if(err) {
					console.log("signInPost err");
					return res.render('index');
				} else {
					console.log("signInPost not err");
					return res.redirect('/home');
				}
			});
		})(req, res, next);
	};

// sign up
// GET
var signUp = function(req, res, next) {
	console.log("isAuthenticated in signUp: " + req.isAuthenticated());
	if(req.isAuthenticated()) {
		res.redirect('/home');
	} else {
		res.render('signup', {title: 'Sign Up'});
	}
};

// sign up
// POST
var signUpPost = function(req, res, next) {
	console.log("in signUpPost");
	var user = req.body;
	var usernamePromise = null;
	usernamePromise = new Model.User({username: user.username}).fetch();

	return usernamePromise.then(function(model) {
		if(model) {
			res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
		} else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new Model.User({username: user.username, password: hash});

         signUpUser.save().then(function(model) {
            // sign in the newly registered user
            signInPost(req, res, next);
        });	
     }
 });
};

// sign out
var signOut = function(req, res, next) {
	if(!req.isAuthenticated()) {
		notFound404(req, res, next);
	} else {
		req.logout();
		res.redirect('/');
	}
};

// 404 not found
var notFound404 = function(req, res, next) {
	res.status(404);
	res.render('404', {title: '404 Not Found'});
};

module.exports.home = home;

// signin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;

// sign out
module.exports.signOut = signOut;

// 404 not found
module.exports.notFound404 = notFound404;







