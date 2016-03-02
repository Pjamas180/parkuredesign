$(document).ready(function () {
	var loadDate = new Date();
	console.log("login page is loaded");

	$('#signup').click(function(event) {
		console.log("signup clicked");
		var now = new Date();
		var elapsed = now - loadDate;
		ga('send', 'timing', 'signup', 'click', elapsed);
	});
});