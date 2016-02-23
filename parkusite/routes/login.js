var users = require("../json/accounts.json");
var home = require("../routes/home.js");

exports.verifyUser = function(req, res) {
	console.log("Verifying User..");
	var username = req.body.username;
	var password = req.body.password;
	var userNum = -1;

	console.log(users.length);

	console.log(username + " " + password);

	var bool = false;
	// Checking for valid user in the json object array
	for (i = 0; i < users.length; i++) {
		var validUsername = users[i]['email'];
		var validPassword = users[i]['password'];
		if (username == validUsername && password == validPassword) {
			userNum = i;
			bool = true;
		}
	}
	if (bool) {
		// If valid user, send the vehicles to the home page.
		res.render('home', {vehicles: users[userNum]['vehicles']});
	} else {
		res.render('index');
	}
}