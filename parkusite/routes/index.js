var usernames = require("../json/accounts.json");

exports.view = function(req, res) {
	console.log("Viewing index file");
	res.render('index');
}