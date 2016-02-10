exports.view = function(req, res) {
	console.log("Viewing index file");
	res.render('index');
}