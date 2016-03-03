$(document).ready(function () {
	var loadDate = new Date();
	console.log("Home Page loaded");

	$('.confirmation').click(function(event) {
		console.log("Purchase button clicked");
		var now = new Date();
		var elapsed = now - loadDate;
		ga('send', 'timing', 'signup', 'click', elapsed);
	});
});