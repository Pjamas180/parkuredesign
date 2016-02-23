var route = require('./route');

exports.view = function(req, res) {
	if(!req.isAuthenticated()) {
		route.notFound404(req, res, next);
	} else {
		res.render('doc');
	}
}