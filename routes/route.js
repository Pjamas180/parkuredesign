// vendor library
var passport = require('passport');
var bcrypt   = require('bcrypt-nodejs');

// custom library
// model
var Model = require('../model');

// index
var home = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  } else {

    // Get session user.
      var userIden = req.user.get("userId");
      var username = req.user.attributes.username;
      // Get all vehicles of the user.

      con.query('SELECT vehicleId, vehicleName FROM vehicles WHERE userId = ?', userIden,
          function(err, rows) {
              if (err) throw err;
              var homePageJSON = {
                'car': [],
                'message': username
              };

              for (var i = 0; i < rows.length; i++) {
                homePageJSON.car.push({
                  'vehicleName' : rows[i].vehicleName
                });
              }
              res.render('home', homePageJSON);
          }
      );
  }
};

// sign in
// GET
var signIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		res.redirect('/home');
	}
	res.render('index');
}

// sign in
// POST
var signInPost = function(req, res, next) {
	passport.authenticate('local', { successRedirect: '/home',
		failureRedirect: '/'}, function(err, user, info) {
			if(err) {
				return res.render('index');
			} 

			if(!user) {
				return res.render('index');
			}
			//	res.redirect('/home');
			req.logIn(user, function(err) {
				//return res.redirect('/home');
				if(err) {
					return res.render('index');
				} else {
					return res.redirect('/home');
				}
			});
		})(req, res, next);
	};

// sign up
// GET
var signUp = function(req, res, next) {
	if(req.isAuthenticated()) {
		res.redirect('/home');
	} else {
		res.render('/');
	}
};

// sign up
// POST
var signUpPost = function(req, res, next) {
	var user = req.body;
	console.log(user);
	var usernamePromise = null;
	usernamePromise = new Model.User({username: user.username}).fetch();

	return usernamePromise.then(function(model) {
		if(model) {
			res.render('/', {title: 'signup', errorMessage: 'username already exists'});
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

var doc = function(req, res, next) {
	if(!req.isAuthenticated()) {
		notFound404(req, res, next);
	} else {
		res.render('doc');
	}
}

var settings = function(req, res, next) {
	if(!req.isAuthenticated()) {
		notFound404(req, res, next);
	} else {
		var user = req.user.body;
		//console.log(user);
		//req.user.set('vehicle', 'car');
		//console.log(req.user.attributes);
		//console.log(req.user.get("vehicle"));
		var user = req.user.attributes.username;
		res.render('settings', {message: user});
	}
}



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

module.exports.doc = doc;

module.exports.settings = settings;






